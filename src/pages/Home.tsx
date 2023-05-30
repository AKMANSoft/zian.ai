import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryBtn, PrimaryBtnNeon, SecondaryBtn } from "../components/ui/buttons";
import { Seperator, VerticalSeperator } from "../components/ui/seperator";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";



export default function HomePage() {
    return (
        <MainLayout heading="Welcome, Mike">
            <div className="flex gap-[20px] h-[calc(100%_-_140px)]">
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



type PostViewSectionProps = {
    className?: string;
    contentClassName?: string;
    heading: React.ReactNode;
}

export function PostViewSection({ className, heading, contentClassName }: PostViewSectionProps) {
    return (
        <GrBorderBox className={cn(
            "p-[2px] rounded-20",
            className
        )} type="lg">
            <div className={cn(
                "backdrop-blur-[10px] bg-gr-purple opacity-90 rounded-20 relative",
                "min-w-[300px] h-full min-h-[500px] px-[30px] py-10",
                contentClassName
            )}>
                {/* Top Center Stick Design  */}
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 bg-primary w-[80%] h-[8px] stick-shadow"></div>
                {/* Main Content  */}
                <div className="h-full flex flex-col justify-between">
                    <div className="">
                        {heading}
                        <p className="mt-7 font-light text-base text-th-gray font-jakarta">
                            Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat.
                        </p>
                        <img src="/images/today-post.png"
                            className="mt-6 rounded-20 overflow-hidden object-cover object-center w-full h-[264px]" />
                        <p className="my-3 text-xs text-white font-bold font-jakarta">
                            <span>Date: </span>
                            <span className="font-medium">April 2022, Sunday 2:00PM</span>
                        </p>
                        <Seperator />
                        <div className="mt-[14px] flex items-center gap-3">
                            <SecondaryBtn>
                                <FontAwesomeIcon icon={faCalendar} />
                                Reschedule
                            </SecondaryBtn>
                            <SecondaryBtn>
                                <FontAwesomeIcon icon={faEdit} />
                                Edit
                            </SecondaryBtn>
                            <SecondaryBtn>
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                            </SecondaryBtn>
                        </div>
                    </div>
                    {/* Buttons  */}
                    <div className="flex items-center gap-4">
                        <SecondaryBtn filled={false} className="border-white/10 py-3 w-1/2">
                            Regenerate Image
                        </SecondaryBtn>
                        <PrimaryBtn className="py-3 w-1/2 h-full">
                            Send Now
                        </PrimaryBtn>
                    </div>
                </div>
            </div>
        </GrBorderBox>
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

