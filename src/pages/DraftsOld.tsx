import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { PrimaryBtnNeon, SecondaryBtn } from "../components/ui/buttons";
import { useState, useRef } from "react";
import { formatNumberto0 } from "@/components/calendar/defaults";
import ViewDraftPopup from "@/components/drafts/ViewDraftPopup";
import AddEditDraftPopup from "@/components/drafts/AddDraftPopup";
import WarningPopup from "@/components/WarningPopup";



const filters = [
    "Announcements",
    "Giveaways",
    "Engagement Questions",
    "Engagement Questions",
    "Promotions",
]


export default function DraftsOldPage() {
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
                <div className="p-3 md:p-5 h-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
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
                    <div className="-mt-px bg-gr-purple-light border h-full border-primary rounded-10 flex flex-col overflow-hidden">
                        <div className="max-h-full max-w-full overflow-auto">
                            <table className="text-white font-jakarta table-auto w-full">
                                <thead className="hidden lg:table-header-group after:content-[''] after:block after:absolute after:w-full after:h-[5px] after:bg-primary bg-[#664f8e] z-[1] sticky top-0">
                                    <tr>
                                        <th className="py-3 min-h-[50px] text-start pl-7 w-24">#</th>
                                        <th className="py-3 min-h-[50px] text-start w-32 px-5">Photo</th>
                                        <th className="py-3 min-h-[50px] text-start px-5 max-w-[200px]">Content</th>
                                        <th className="py-3 min-h-[50px] text-start w-44 px-5">Status</th>
                                        <th className="py-3 min-h-[50px] text-start w-48 px-5">Username</th>
                                        <th className="py-3 min-h-[50px] text-start px-5">Created Date</th>
                                        <th className="py-3 min-h-[50px] text-start px-12">Actions</th>
                                        <th className="py-3 min-h-[50px] text-start pr-7">Photo</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                                    <SingleTableRow num={11} />
                                </tbody>
                            </table>
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
        <tr role="button" className="grid grid-cols-12 lg:table-row" onClick={onClick}>
            <td className="py-5 pl-7 hidden lg:table-cell">
                {formatNumberto0(num)}
            </td>
            <td className="py-5 px-5 w-full lg:w-auto h-auto col-span-3">
                <img src="/images/table-img.png" width={80} height={80} loading="lazy" className="w-full h-auto aspect-square" alt="" />
            </td>
            <td className="py-5 px-5 col-span-8 flex items-center lg:table-cell">
                <p className="line-clamp-4 lg:max-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquid doloribus mollitia magni fugiat quisquam rerum a alias aspernatur, dolorem in neque dolore sed quis hic nulla animi minima debitis.
                </p>
            </td>
            <td className="py-5 px-5 col-span-full">
                <span>Scheduled</span>
            </td>
            <td className="py-5 px-5">
                moonlanding.media
            </td>
            <td className="py-5 px-5">
                April 2022,  Sunday   2:00PM
            </td>
            <td className="py-5 px-12">
                <div className="inline-flex items-center gap-2">
                    <ViewDraftPopup />
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
            </td>
            <td className="py-5 pr-7">
                <PrimaryBtnNeon className="py-3 h-10 px-3 font-medium text-[15px]">
                    Regenerate
                </PrimaryBtnNeon>
            </td>
        </tr>
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







