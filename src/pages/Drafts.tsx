import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { PrimaryBtnNeon, SecondaryBtn } from "../components/ui/buttons";
import { useState, useRef, useEffect } from "react";
import { formatNumberto0 } from "@/components/calendar/defaults";
import PostViewPopup from "@/components/drafts/PostViewPopup";
import AddEditDraftPopup from "@/components/drafts/AddEditDraftPopup";
import WarningPopup from "@/components/WarningPopup";
import { changeImageUrl } from '@/lib/utils'
// import { createContext, useContext } from 'react';

import {
  useLoaderData,
} from 'react-router-dom'

import {
  userApiClient,
  twitterUserApiClient,
  contentApiClient,
} from '@/api.env'



const filters = [
    "Announcements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
]


export default function DraftsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [contentResult, setContentResult] = useState<any>(null);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [numPerPage, setNumPerPage] = useState<number>(0);
    const [deleteNumber, setDeleteNumber] = useState<number>(0);
    let totalPage = 0;

    const pageData: any = useLoaderData();
    // console.log(pageData);
    const [topic, setTopic] = useState(pageData.topicsList[0].text);
    
    const onTabsScrollClick = (reverse = false) => {
        tabsContainerRef.current?.scrollBy({
            behavior: "smooth",
            left: 300 * (reverse ? -1 : 1)
        })
    }

    useEffect(() => {
        async function startFetching() {
          // setContentResult(null);
          const result = await contentApiClient.contentsList({page, topic}).then((r) => {
            // console.log(r);
            return r;
          }).catch((e) => {
            console.log(e);
            console.log(`page: ${page}`);
            if (page > 1) {
              const page1 = page - 1;
              console.log(`previous page: ${page1}`);
              setPage(page1);  // find previous page data
            }
          });

          if (!ignore) {
            if (result) {
              setContentResult(result);
              setCount(result.count);
              if (numPerPage < result.results.length) {
                setNumPerPage(result.results.length);
              }

              // totalPage = Math.ceil(count / numPerPage);
              // console.log(`count: ${count}, numPerPage: ${numPerPage}, totalPage: ${totalPage}`);

              if (! result.results) {
                console.log(`page: ${page}`);
                const page1 = page - 1;
                console.log(`page1: ${page1}`);
                setPage(page1);  // find previous page data
              }
            }
          }
        }

      let ignore = false;
      startFetching();
      return () => {
        ignore = true;
      }
    }, [page, deleteNumber, topic]);

    function getContentListFromPage() {
      // if (page <= 1) {
      //   let itemList = pageData?.contentsList?.results && pageData?.contentsList.results.map( (content: any) =>
      //     <SingleTableRow num={content.id} content={content} /> );
      //   return itemList;
      // } else {
      //   if (contentResult) {
      //     return contentResult.results.map((content: any) =>
      //     <SingleTableRow num={content.id} content={content} /> );
      //   }
      //   return [];
      // }

      if (contentResult) {
        return contentResult.results.map((content: any) =>
        <SingleTableRow num={content.id} content={content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber}/> );
      } else {
        let itemList = pageData?.contentsList?.results && pageData?.contentsList.results.map( (content: any) =>
          // <SingleTableRow num={content.id} content={content} /> );
          <SingleTableRow num={content.id} content={content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber}/> );
        return itemList;
      }
    }

    return (
        <MainLayout heading="Drafts" user={pageData.user}>
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="p-3 md:p-5 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    {/* Tabs List View  */}
                    <div className="flex flex-col-reverse gap-5 md:gap-0 md:grid md:grid-cols-10">
                        <div className="relative min-h-[50px] w-full col-span-8 lg:col-span-9 gap-3">
                            <button type="button" onClick={() => onTabsScrollClick(true)} className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5 aspect-square rounded-10 bg-transparent hover:text-primary text-white">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>

                            <div ref={tabsContainerRef} className="flex mx-10 md:mx-16  h-full gap-3 no-scrollbar overflow-x-auto">
                                {
                                    // [...filters, ...filters].map((filter, index) => (
                                    // [...filters].map((filter, index) => (
                                  [...pageData.topicsList.map((e: any) => e.text)].map((filter, index) => (
                                        <TabItem
                                            key={filter} text={filter}
                                            active={index === activeTab}
                                            onClick={() => {setActiveTab(index); setTopic(filter); setPage(1);}} />
                                    ))
                                }
                            </div>

                            <button type="button" onClick={() => onTabsScrollClick()} className="absolute top-1/2 -translate-y-1/2 right-3 md:right-5 aspect-square rounded-10 bg-transparent hover:text-primary text-white">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>

                        </div>
                        <AddEditDraftPopup variant="add" />
                    </div>
                    {/* Drafts Table  */}
                    <div className="-mt-px bg-gr-purple-light border w-full h-full border-primary rounded-10 flex flex-col overflow-hidden">
                        <div className="max-h-full max-w-full overflow-auto divide-y bg-[#664f8e] lg:bg-transparent divide-white/10 space-y-5 lg:divide-y-0 px-5 lg:px-0">
                            <div className="border-b-[5px] w-full min-w-max hidden lg:flex xl:justify-between items-center border-primary bg-[#664f8e] z-[1] gap-3 sticky top-0">
                                <span className="block text-white py-3 min-h-[50px] text-start w-[50px] overflow-hidden lg:ps-4">#</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Photo</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden min-w-[200px]">Content</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Status</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Username</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Created Date</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden min-w-[200px]">Actions</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden lg:pr-4">Photo</span>
                            </div>
                            {
                              // pageData?.contentsList?.results && pageData?.contentsList.results.map( (content: any) =>
                              //   <SingleTableRow num={content.id} content={content} /> )

                              getContentListFromPage()
                            }
                            {/*
                            <SingleTableRow num={1} />
                            <SingleTableRow num={2} />
                            <SingleTableRow num={3} />
                            <SingleTableRow num={4} />
                            <SingleTableRow num={5} />
                            <SingleTableRow num={6} />
                            <SingleTableRow num={7} />
                            <SingleTableRow num={8} />
                            <SingleTableRow num={9} />
                            <SingleTableRow num={10} />
                              */}
                        </div>
                        {/* Table Footer / Pagination  */}
                        <DraftsPagination currentPage={page} totalPage={Math.ceil(count / numPerPage)} setPage={setPage}/>
                    </div>
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}





function DraftsPagination({currentPage, totalPage, setPage}: any) {
    const [activePage, setActivePage] = useState(1);
    let visiblePages: number[] = [];

    console.log(`totalPage: ${totalPage}, currentPage: ${currentPage}`);

    if (activePage !== currentPage) {
      setActivePage(currentPage);
    }

    if (currentPage <= 3) {
      if (totalPage >= 5) {
        visiblePages = [1, 2, 3, 4, 5];
      } else if (totalPage === 4) {
        visiblePages = [1, 2, 3, 4];
      } else if (totalPage === 3) {
        visiblePages = [1, 2, 3];
      } else if (totalPage === 2) {
        visiblePages = [1, 2];
      } else if (totalPage === 1) {
        visiblePages = [1];
      }
    } else if (currentPage <= totalPage - 2){
      visiblePages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    } else {
      // currentPage > totalPage - 2
      if (currentPage === totalPage - 1) {
        visiblePages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1];
      } else if (currentPage === totalPage) {
        visiblePages = [currentPage - 2, currentPage - 1, currentPage];
      }
    }

    const onPageChange = (page: number, totalPage?: number) => {
      let lastPage = 0;
        if (totalPage) {
          lastPage = totalPage;
        } else {
          lastPage = visiblePages[visiblePages.length - 1];
        }

        let newPage = page;
        if (newPage <= 0) newPage = 1
        if (newPage >= lastPage) newPage = lastPage
        
        setActivePage(newPage);
        setPage(newPage);
    }

    return (
        <div className="w-full border-t border-white/10 py-[10px] px-5 sticky bottom-0 bg-dark flex items-center justify-end">
            <div className="flex items-center gap-2">
                <button type="button"
                    onClick={() => onPageChange(1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal text-white p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button"
                    onClick={() => onPageChange(activePage - 1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal text-white p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {
                    visiblePages.map((page) => (
                        <button key={page} type="button"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "outline-none rounded text-xs font-normal text-white p-2 w-8 h-8 aspect-square",
                                activePage === page ? "bg-primary" : "bg-white/5"
                            )}>
                            {page}
                        </button>
                    ))
                }
                <button type="button"
                    onClick={() => onPageChange(activePage + 1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal text-white p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <button type="button"
                    // onClick={() => onPageChange(visiblePages[visiblePages.length - 1])}
                    onClick={() => onPageChange(totalPage, totalPage)}
                    className="outline-none bg-white/5 rounded text-xs font-normal text-white p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}




type SingleTableRowProps = {
    num: number;
    onClick?: () => void
    content?: any
    deleteNumber: number
    setDeleteNumber: any
}


function SingleTableRow({ onClick, num, content, deleteNumber, setDeleteNumber }: SingleTableRowProps) {
    function onDeleteContent(): void {
      if (content) {
        console.log(`Delete content: ${content.id}`);
        contentApiClient.contentsDelete({id: content.id}).then((r) => {
          // console.log(r);
            // window.location.reload();
          setDeleteNumber(deleteNumber + 1);
        });
      }
    }

    return (
        <div className="flex flex-wrap xl:justify-between lg:flex-nowrap lg:gap-3 items-center lg:min-w-max" role="button" onClick={onClick}>
            <span className="hidden lg:block text-white py-3 min-h-[50px] text-start w-[50px] overflow-hidden lg:ps-4">
                {formatNumberto0(num)}
            </span>
            <span className="block text-white py-3 lg:min-h-[50px] text-start w-1/3 lg:w-[150px] overflow-hidden">
              {/*<img src={changeImageUrl("/images/table-img.png")} width={80} height={80} loading="lazy" className="w-full h-full lg:w-auto min-w-[80px] lg:h-[80px] aspect-square" alt="" />*/}
              { 
                content?.image ? 
                  <img src={content?.image} width={80} height={80} loading="lazy" className="w-full h-full lg:w-auto min-w-[80px] lg:h-[80px] aspect-square" alt="" />
                  :
                  <span>No Image</span>

              }
                            </span>
            <span className="block text-white py-3 lg:min-h-[50px] text-start w-2/3 lg:w-[150px] overflow-hidden min-w-[200px] px-2">
                <p className="w-full line-clamp-4">
                  {content?.text}
                </p>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Status:</span>
                    <span>{content?.statusText}</span>
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Username:</span>
                    <span className="block lg:w-full max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {/*content?.creator*/}
                      {content?.twitterUsername}
                    </span>
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Created Date:</span>
                    <span>
                      {content?.createdTime.toLocaleString()}
                    </span>
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-[150px] max-w-[200px] overflow-hidden min-w-[200px]">
                <div className="inline-flex items-center gap-2">
                    <PostViewPopup content={content}/>
                    <AddEditDraftPopup variant="edit" />
                    <WarningPopup
                        heading="Are you sure you want to delete this post?"
                        description={content?.text}
                        negativeText="Cancel"
                        positiveText="Yes, Delete"
                        trigger={({ open }) => (
                            <SecondaryBtn onClick={open} className="p-3">
                                <FontAwesomeIcon icon={faTrash} />
                            </SecondaryBtn>
                        )}
                       onClickPositiveTextButton={onDeleteContent}
                    />
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-[calc(100%_-_200px)] lg:w-[150px] overflow-hidden lg:pr-4">
                <div className="flex items-center justify-end lg:justify-start">
                    <PrimaryBtnNeon className="max-w-[400px] py-3 h-10 px-3 font-medium text-[15px] inline-flex items-center justify-center w-full lg:w-auto">
                        Regenerate
                    </PrimaryBtnNeon>
                </div>
            </span>
        </div>
    );
}



type TabItemProps = {
    text: string;
    className?: string;
    active?: boolean;
    onClick?: () => void
}

function TabItem({ text, className, active = false, onClick }: TabItemProps) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "min-w-max h-full px-6 rounded-t-10 text-white border transition-all duration-500",
            active ? "bg-[#664f8e] border-primary border-b-[#664f8e]" : "bg-transparent border-transparent",
            className
        )}>
            {text}
        </button>
    );
}







