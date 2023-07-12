import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerticalSeperator } from "../components/ui/seperator";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import PostViewSection, { ScheduleListItem } from "../components/postview-section";




export default function HomePage() {
    return (
        <MainLayout heading="Welcome, Mike">
            
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal mb-4 text-center lg:text-start xl:hidden">
                Welcome, Mike
            </h2>
            {/* <div>
                <LoginPopup/>
            </div> */}
            <div className="flex flex-col lg:flex-row gap-5 pb-5 min-h-[calc(100vh_-_100px)]">
                <PostViewSection className="w-full h-full lg:w-2/5" heading={
                    <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                        Today&apos;s Post
                    </h5>
                } />
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="pb-10 h-full min-h-[500px] bg-gr-purple-light opacity-90 rounded-20 relative">
                        {/* Bottom Right Corner Design  */}
                        <div className="absolute -bottom-[27px] -right-[19px] w-[150px] h-[150px]">
                            <img src="/images/bottom-right-corner.svg" loading="lazy" className="h-full w-full" alt="" />
                        </div>
                        {/* Main Content  */}
                        <div className="py-[38px] h-full overflow-hidden">
                            <div className="px-5 pb-11 md:px-[30px] w-full inline-flex justify-between items-center">
                                <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                                    My Schedule
                                </h5>
                                <a href="/calendar" className="hidden md:inline-flex text-base text-white font-normal items-center gap-3">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    View Calendar
                                </a>
                            </div>
                            <div className="max-h-full overflow-y-auto">
                                <div className="md:px-[30px]">
                                    <h6 className="px-5 md:px-0 text-sm font-normal text-white">Today</h6>
                                    <div className="mt-4 flex flex-col gap-1 md:gap-3">
                                        <HScheduleListItem active />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <VerticalSeperator className="h-[25px] mt-[10px]" />
                                    </div>
                                </div>
                                <div className="mt-5 md:px-[30px]">
                                    <h6 className="px-5 md:px-0 text-sm font-normal text-white">Yesterday</h6>
                                    <div className="mt-4 flex flex-col gap-1 md:gap-3">
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                        <HScheduleListItem />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
    );
}


type HScheduleListItemProps = {
    active?: boolean
}

function HScheduleListItem({ active }: HScheduleListItemProps) {
    return (
        <ScheduleListItem
            leading={
                <p className="inline-flex w-full min-w-max items-center gap-2 font-jakarta text-sm text-white font-normal mr-[10px] max-w-[120px] overflow-x-hidden">
                    <span className="w-4 h-4 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={cn(active ? "fill-th-green-3" : "fill-white/30")}>
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                    </span>
                    9:30 AM
                </p>
            }
        />
    )
}
