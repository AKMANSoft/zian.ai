import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryBtnNeon } from "../components/ui/buttons";
import { VerticalSeperator } from "../components/ui/seperator";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import PostViewSection from "../components/postview-section";




export default function HomePage() {
    return (
        <MainLayout heading="Welcome, Mike">
            <div className="flex gap-[20px] h-full">
                <PostViewSection className="w-2/5" heading={
                    <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                        Today&apos;s Post
                    </h5>
                } />
                <GrBorderBox className="w-3/5 p-[2px] rounded-20" type="lg">
                    <div className=" pb-10 h-full min-h-[500px] bg-gr-purple-light opacity-90 rounded-20 relative">
                        {/* Bottom Right Corner Design  */}
                        <div className="absolute -bottom-[27px] -right-[19px] w-[150px] h-[150px]">
                            <img src="/images/bottom-right-corner.svg" className="h-full w-full" alt="" />
                        </div>
                        {/* Main Content  */}
                        <div className="h-auto px-[30px] py-[38px]">
                            <div className="w-full inline-flex justify-between items-center">
                                <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                                    My Schedule
                                </h5>
                                <a href="/calendar" className="text-base text-white font-normal inline-flex items-center gap-3">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    View Calendar
                                </a>
                            </div>
                            <div className="mt-11">
                                <h6 className="text-sm font-normal text-white">Today</h6>
                                <div className="mt-4 flex flex-col gap-3">
                                    <ScheduleListItem active />
                                    <ScheduleListItem />
                                    <ScheduleListItem />
                                    <VerticalSeperator className="h-[25px] mt-[10px]" />
                                </div>
                            </div>
                            <div className="mt-5">
                                <h6 className="text-sm font-normal text-white">Yesterday</h6>
                                <div className="mt-4 flex flex-col gap-[10px]">
                                    <ScheduleListItem />
                                    <ScheduleListItem />
                                    <ScheduleListItem />
                                    <ScheduleListItem />
                                    <ScheduleListItem />
                                </div>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
    );
}


type ScheduleListItemProps = {
    active?: boolean;
}

function ScheduleListItem({ active = false }: ScheduleListItemProps) {
    return (
        <div className="w-full bg-[#f2e4f11a] px-3 py-[10px] rounded-10 flex items-center gap-[10px]">
            <p className="inline-flex items-center justify-center gap-2 font-jakarta text-sm text-white font-normal mr-[10px]">
                <span className="w-4 h-4 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={cn(active ? "fill-th-green-3" : "fill-white/30")}>
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                </span>
                9:30 AM
            </p>
            <PrimaryBtnNeon className="text-base text-th-gray">
                <FontAwesomeIcon icon={faTwitter} />
                @moonlanding.media
            </PrimaryBtnNeon>
            <PrimaryBtnNeon className="text-base text-th-gray">
                <FontAwesomeIcon icon={faFacebook} />
                @moonlanding.media
            </PrimaryBtnNeon>
            <PrimaryBtnNeon className="text-base text-th-gray">
                +1
            </PrimaryBtnNeon>
        </div>
    );
}

