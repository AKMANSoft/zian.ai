import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryBtnNeon } from "../components/ui/buttons";
import { VerticalSeperator } from "../components/ui/seperator";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import PostViewSection from "../components/postview-section";




export default function HomePage() {
    return (
        <MainLayout heading="Welcome, Mike">
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal mb-4 text-center">
                Welcome, Mike
            </h2>
            <div className="flex flex-col lg:flex-row gap-5 pb-5">
                <PostViewSection className="w-full lg:w-2/5" heading={
                    <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                        Today&apos;s Post
                    </h5>
                } />
                <GrBorderBox className="w-full p-[2px] rounded-20" type="lg">
                    <div className=" pb-10 min-h-[500px] bg-gr-purple-light opacity-90 rounded-20 relative">
                        {/* Bottom Right Corner Design  */}
                        <div className="absolute -bottom-[27px] -right-[19px] w-[150px] h-[150px]">
                            <img src="/images/bottom-right-corner.svg" className="h-full w-full" alt="" />
                        </div>
                        {/* Main Content  */}
                        <div className="py-[38px]">
                            <div className="px-5 md:px-[30px] w-full inline-flex justify-between items-center">
                                <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                                    My Schedule
                                </h5>
                                <a href="/calendar" className="hidden md:inline-flex text-base text-white font-normal items-center gap-3">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    View Calendar
                                </a>
                            </div>
                            <div className="mt-11 md:px-[30px]">
                                <h6 className="px-5 md:px-[30px] text-sm font-normal text-white">Today</h6>
                                <div className="mt-4 flex flex-col gap-1 md:gap-3">
                                    <ScheduleListItem active />
                                    <ScheduleListItem />
                                    <ScheduleListItem />
                                    <VerticalSeperator className="h-[25px] mt-[10px]" />
                                </div>
                            </div>
                            <div className="mt-5">
                                <h6 className="px-5 md:px-[30px] text-sm font-normal text-white">Yesterday</h6>
                                <div className="mt-4 flex flex-col gap-1 md:gap-3">
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
        <div className="w-full bg-[#f2e4f11a] px-3 py-[10px] md:rounded-10 flex flex-auto items-center gap-[10px]">
            <p className="inline-flex w-full min-w-max items-center gap-2 font-jakarta text-sm text-white font-normal mr-[10px] max-w-[120px] overflow-x-hidden">
                <span className="w-4 h-4 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={cn(active ? "fill-th-green-3" : "fill-white/30")}>
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                </span>
                9:30 AM
            </p>
            <div className="flex gap-2">
                <SmallSchedulePostEl text="@moonlanding.media" icon={faTwitter} />
                <SmallSchedulePostEl text="@moonlanding.media" icon={faFacebook} />
                <SmallSchedulePostEl text="+1" keepVisible />
            </div>
        </div>
    );
}


type SmallSchedulePostElProps = {
    text?: string;
    icon?: IconDefinition;
    keepVisible?: boolean;
}

function SmallSchedulePostEl({ text, icon, keepVisible = false }: SmallSchedulePostElProps) {
    // hidden xs:inline-flex first:inline-flex last:inline-flex
    return (
        <PrimaryBtnNeon className="text-base text-th-gray">
            {
                icon && <FontAwesomeIcon icon={icon} />
            }
            {
                text &&
                <span className={cn(
                    "w-max-[80px] xl:max-w-[150px]",
                    !keepVisible && "hidden lg:inline text-ellipsis overflow-hidden"
                )}>
                    {text}
                </span>
            }
        </PrimaryBtnNeon>
    );
}

