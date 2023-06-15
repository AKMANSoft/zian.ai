import PostViewSection from "../components/postview-section";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import CalendarView from "../components/calendar/calendar-view";
import { cn } from "../lib/utils";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



export default function CalendarPage() {
    const [post, setPost] = useState(false);
    return (
        <MainLayout heading="Calendar">
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal mb-4 text-center lg:text-start xl:hidden">
                Calendar
            </h2>
            <div className="pb-5 flex flex-col lg:flex-row gap-5 h-full">
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light rounded-20 relative overflow-hidden">
                        <CalendarView onPostSelect={() => setPost(true)} />
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className={cn(
                        "w-full lg:w-2/5 xl:w-1/3",
                        // "hidden lg:block",
                        post && window.innerWidth <= 1000 && "fixed backdrop-blur-3xl max-h-full top-0 left-0 z-[55] rounded-none h-full overflow-y-auto"
                    )}
                    contentClassName={cn(
                        "px-4 pt-8 pb-5",
                        post && window.innerWidth <= 1000 && "rounded-none min-h-screen"
                    )}
                    heading={
                        <div className="flex items-center justify-between">
                            <h5 className="rounded-full h-12 inline-flex items-center gap-3 px-5 bg-white/10 text-base text-white font-jakarta font-semibold">
                                <FontAwesomeIcon icon={faTwitter} />
                                Twitter Post
                            </h5>
                            <button type="button" onClick={() => setPost(false)}
                                className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    } />
            </div>
        </MainLayout>
    );
}


