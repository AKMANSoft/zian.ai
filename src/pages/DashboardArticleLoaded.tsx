import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { useState } from "react";
import { formatNumberto0 } from "@/components/calendar/defaults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardArticleLoaded() {

    return (
        <MainLayout heading="Drafts">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    {/* Drafts Table  */}
                    <div className="-mt-px bg-gr-purple-light border w-full h-full border-primary rounded-10 flex flex-col overflow-hidden">
                        <div className="max-h-full max-w-full overflow-auto divide-y  lg:bg-transparent divide-white/10 space-y-5 lg:divide-y-0 px-5 lg:px-0">
                            <div className="border-b-[5px] w-full min-w-max hidden lg:flex xl:justify-between items-center border-primary  z-[1] gap-3 sticky top-0">
                                <span className="block text-white py-3 min-h-[50px] text-start w-[50px] overflow-hidden lg:ps-4">#</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Photo</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden min-w-[200px]">Headline</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Preview</span>
                                <span className="block text-white py-3 min-h-[50px] text-start w-[150px] overflow-hidden">Created Date</span>
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
            <span className="block text-white py-3 lg:min-h-[50px] text-start  lg:w-[150px] overflow-hidden min-w-[200px] px-2">
                <p className="w-full line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...
                </p>
            </span>

            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                <div className="flex items-center justify-between">
                    <span className="font-semibold block lg:hidden">Created Date:</span>
                    <span>
                        April 2022,  Sunday   2:00PM
                    </span>
                </div>
            </span>

        </div>
    );
}











