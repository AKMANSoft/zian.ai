import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { b64Image, cn } from "../lib/utils";
import { useState } from "react";
import { formatNumberto0 } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryBtnNeon } from "@/components/ui/buttons";
import ArticleViewPopup from "@/components/popups/ArticleViewPopup";
import { format } from "date-fns";
import CONSTANTS from "@/lib/constants";
import { articles } from '@/assets/dummy-articles.json'
import { Article } from "@/types/response.types";



const dummyArticles: Article[] = articles.map((article) => ({
    body: article.article,
    summary: article.summary,
    headline: article.headline,
    id: article.id,
    image: article.image,
    timestamp: new Date(article.timestamp)
}))

export default function DashboardArticleLoaded() {
    return (
        <MainLayout heading="Welcome, Mike" description="Here is your articles history">
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_140px)] " type="lg">
                <div className="h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    {/* Drafts Table  */}
                    <div className="w-full h-full rounded-20 flex flex-col overflow-hidden">
                        <div className="border-b-[5px] text-xs font-semibold w-full hidden lg:flex xl:justify-between items-center py-5 border-primary z-[1] gap-3">
                            <span className="block text-start w-[50px] overflow-hidden lg:ps-4">#</span>
                            <span className="block text-start w-[100px] overflow-hidden">Photo</span>
                            <span className="block text-start w-[20%] overflow-hidden min-w-[200px]">Headline</span>
                            <span className="block text-start w-[40%] overflow-hidden">Preview</span>
                            <span className="block text-start w-[150px] overflow-hidden">Created Date</span>
                            <span className="block text-start w-[100px] overflow-hidden"></span>
                        </div>
                        <div className="max-h-full max-w-full h-screen lg:overflow-y-auto divide-y lg:bg-transparent divide-white/10 space-y-5 lg:divide-y-0 px-5 lg:px-0">
                            <SingleArticleRow num={1} />
                            <SingleArticleRow num={2} />
                            <SingleArticleRow num={3} />
                        </div>
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
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button"
                    onClick={() => onPageChange(activePage - 1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {
                    visiblePages.map((page) => (
                        <button key={page} type="button"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "outline-none rounded text-xs font-normal transition-all p-2 w-8 h-8 aspect-square",
                                activePage === page ? "bg-primary" : "bg-white/5 hover:bg-primary"
                            )}>
                            {page}
                        </button>
                    ))
                }
                <button type="button"
                    onClick={() => onPageChange(activePage + 1)}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <button type="button"
                    onClick={() => onPageChange(visiblePages[visiblePages.length - 1])}
                    className="outline-none bg-white/5 rounded text-xs font-normal hover:bg-primary transition-all p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}




type SingleArticleRowProps = {
    num: number;
    onClick?: () => void
}



function SingleArticleRow({ num }: SingleArticleRowProps) {
    const article = dummyArticles[0];
    return (
        <ArticleViewPopup
            article={article}
            trigger={({ open }) => (
                <div role="button" onClick={open} className="flex flex-wrap xl:justify-between lg:flex-nowrap lg:gap-3 items-center w-full" >
                    <span className="hidden lg:block text-sm py-3 min-h-[50px] text-start w-[50px] overflow-hidden lg:ps-4">
                        {formatNumberto0(num)}
                    </span>
                    <span className="block py-3 lg:min-h-[50px] text-start lg:w-[100px] overflow-hidden">
                        <img src={b64Image(article.image)} width={80} height={80} loading="lazy"
                            className="h-full min-w-[80px] lg:h-[80px] rounded-10 object-cover object-center aspect-square" alt="" />
                    </span>
                    <span className="block py-3 lg:min-h-[50px] text-start w-[calc(100%_-_80px)] lg:w-[20%] overflow-hidden md:min-w-[200px] px-2">
                        <p className="w-full line-clamp-2 text-xs md:text-sm">
                            {article.headline}
                        </p>
                    </span>
                    <span className="hidden lg:block py-3 lg:min-h-[50px] text-start  lg:w-[40%] overflow-hidden min-w-[200px] px-2">
                        <p className="w-full line-clamp-2 text-xs md:text-sm">
                            {article.summary}
                        </p>
                    </span>

                    <span className="block py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[150px] overflow-hidden">
                        <div className="flex items-center justify-between text-xs md:text-sm font-jakarta">
                            <span className="font-semibold block lg:hidden">Created Date:</span>
                            <span>
                                {format(article.timestamp, CONSTANTS.DATE_FORMATS.ARTICLE_TABLE)}
                            </span>
                        </div>
                    </span>

                    <span className="block py-1 lg:py-3 lg:min-h-[50px] text-start w-full lg:w-[100px] overflow-hidden">
                        <div className="flex items-center justify-end mt-5 lg:mt-0 lg:block">
                            <PrimaryBtnNeon className="w-full md:w-auto text-xs md:text-sm">
                                View
                            </PrimaryBtnNeon>

                        </div>
                    </span>

                </div>
            )} />

    );
}











