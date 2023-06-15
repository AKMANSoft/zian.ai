import PostViewSection from "../components/postview-section";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import CalendarView from "../components/calendar/calendar-view";
import { cn } from "../lib/utils";



export default function CalendarPage() {
    return (
        <MainLayout heading="Calendar">
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal mb-4 text-center lg:text-start xl:hidden">
                Calendar
            </h2>
            <div className="pb-5 flex flex-col lg:flex-row gap-5 h-full">
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light rounded-20 relative overflow-hidden">
                        <CalendarView />
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className={cn(
                        "w-full lg:w-2/5 xl:w-1/3",
                        "hidden lg:block"
                    )}
                    contentClassName="px-4 pt-8 pb-5"
                    heading={
                        <h5 className="rounded-full h-12 inline-flex items-center gap-3 px-5 bg-white/10 text-base text-white font-jakarta font-semibold">
                            <FontAwesomeIcon icon={faTwitter} />
                            Twitter Post
                        </h5>
                    } />
            </div>
        </MainLayout>
    );
}


