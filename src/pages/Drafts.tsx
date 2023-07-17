import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { PrimaryBtnNeon, SecondaryBtn } from "../components/ui/buttons";
import { useState, useRef } from "react";
import { formatNumberto0 } from "@/components/calendar/defaults";
import PostViewPopup from "@/components/drafts/PostViewPopup";
import AddEditDraftPopup from "@/components/drafts/AddEditDraftPopup";
import WarningPopup from "@/components/WarningPopup";



const filters = [
    "Announcements",
    "Giveaways",
    "Engagement Questions",
    "Engagement Questions",
    "Promotions",
]


export default function DraftsPage() {
    const [activeTab, setActiveTab] = useState(0);
    const tabsContainerRef = useRef<HTMLDivElement>(null);

    const onTabsScrollClick = (reverse = false) => {
        tabsContainerRef.current?.scrollBy({
            behavior: "smooth",
            left: 300 * (reverse ? -1 : 1)
        })
    }

    return (
        <MainLayout heading="Drafts">
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
                                    [...filters, ...filters].map((filter, index) => (
                                        <TabItem
                                            key={filter} text={filter}
                                            active={index === activeTab}
                                            onClick={() => setActiveTab(index)} />
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
                        </div>
                        {/* Table Footer / Pagination  */}
                        <DraftsPagination />
                    </div>
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}





function DraftsPagination() {
    const [activePage, setActivePage] = useState(1);
    const visiblePages = [1, 2, 3, 4, 5];

    const onPageChange = (page: number) => {
        const lastPage = visiblePages[visiblePages.length - 1];
        let newPage = page;
        if (newPage <= 0) newPage = 1
        if (newPage >= lastPage) newPage = lastPage
        setActivePage(newPage);
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
                    onClick={() => onPageChange(visiblePages[visiblePages.length - 1])}
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
}


function SingleTableRow({ onClick, num }: SingleTableRowProps) {
    return (
        <div className="flex flex-wrap xl:justify-between lg:flex-nowrap lg:gap-3 items-center lg:min-w-max" role="button" onClick={onClick}>
            <span className="hidden lg:block text-white py-3 min-h-[50px] text-start w-[50px] overflow-hidden lg:ps-4">
                {formatNumberto0(num)}
            </span>
            <span className="block text-white py-3 lg:min-h-[50px] text-start w-1/3 lg:w-[150px] overflow-hidden">
                <img src="/images/table-img.png" width={80} height={80} loading="lazy" className="w-full h-full lg:w-auto min-w-[80px] lg:h-[80px] aspect-square" alt="" />
            </span>
            <span className="block text-white py-3 lg:min-h-[50px] text-start w-2/3 lg:w-[150px] overflow-hidden min-w-[200px] px-2">
                <p className="w-full line-clamp-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquid doloribus mollitia magni fugiat quisquam rerum a alias aspernatur, dolorem in neque dolore sed quis hic nulla animi minima debitis.
                </p>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Status:</span>
                    <span>Scheduled</span>
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Username:</span>
                    <span className="block lg:w-full max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                        moonlanding.media
                    </span>
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Created Date:</span>
                    <span>
                        April 2022,  Sunday   2:00PM
                    </span>
                </div>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-[150px] max-w-[200px] overflow-hidden min-w-[200px]">
                <div className="inline-flex items-center gap-2">
                    <PostViewPopup />
                    <AddEditDraftPopup variant="edit" />
                    <WarningPopup
                        heading="Are you sure you want to delete this post?"
                        description="Lorem ipsum dolor sit amet, consect etur sed det dolor  rem ipsum dolor sit"
                        negativeText="Cancel"
                        positiveText="Yes, Delete"
                        trigger={({ open }) => (
                            <SecondaryBtn onClick={open} className="p-3">
                                <FontAwesomeIcon icon={faTrash} />
                            </SecondaryBtn>
                        )}
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








