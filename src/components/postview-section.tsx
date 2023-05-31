import { faCalendar, faEdit, faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../lib/utils";
import { SecondaryBtn, PrimaryBtn } from "./ui/buttons";
import GrBorderBox from "./ui/gr-border-box";
import { Seperator } from "./ui/seperator";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";






type PostViewSectionProps = {
    heading?: React.ReactNode;
    className?: string;
    contentClassName?: string;
    customContent?: React.ReactNode;
}

export default function PostViewSection({ className, heading, contentClassName, customContent }: PostViewSectionProps) {
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
                {
                    (customContent && customContent !== null) ? customContent
                        :
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
                }
            </div>
        </GrBorderBox>
    );
}






export function CalendarPostEl() {
    return (
        <button className="w-full text-start cursor-pointer bg-radial-gr-purple rounded-md border h-auto border-primary/40 py-2 px-3">
            <h5 className="text-white text-xs font-bold font-jakarta line-clamp-1">
                <FontAwesomeIcon icon={faTwitter} className="mr-[3px]" />
                @moonlanding
            </h5>
            <p className="text-white/40 text-xs font-normal font-jakarta mt-2">
                9:30pm
                <br />
                <FontAwesomeIcon icon={faImage} className="mt-2 text-white/60" />
            </p>
        </button>
    );
}


