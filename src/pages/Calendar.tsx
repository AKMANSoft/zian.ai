import PostViewSection from "../components/postview-section";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Datepicker } from "../components/calendar-view";



export default function CalendarPage() {
    return (
        <MainLayout heading="Calendar">
            <div className="flex gap-[20px] h-full">
                <GrBorderBox className="w-4/5 p-[2px] rounded-20" type="lg">
                    <div className=" pb-10 h-full min-h-[500px] bg-gr-purple-light opacity-90 rounded-20 relative">
                        {/* Bottom Right Corner Design  */}
                        <div className="absolute -bottom-[27px] -right-[19px] w-[150px] h-[150px]">
                            <img src="/images/bottom-right-corner.svg" className="h-full w-full" alt="" />
                        </div>
                        {/* Main Content  */}
                        <div className="h-full px-[30px] py-[38px]">
                            <CalendarView />
                        </div>
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className="w-1/4"
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


function CalendarView() {
    return (
        <Datepicker
            onDateSelected={(date) => console.log(date.date)}
        />
    )
}

