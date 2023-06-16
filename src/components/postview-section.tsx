import { IconDefinition, faCalendar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../lib/utils";
import { SecondaryBtn, PrimaryBtn, PrimaryBtnNeon } from "./ui/buttons";
import GrBorderBox from "./ui/gr-border-box";
import { Seperator } from "./ui/seperator";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { OverflowList } from "react-overflow-list";
import ImageEl from "./ImageEl";
import { useState } from "react";
import { PostStatus } from "@/pages/GenerateContent";
import PostViewPopup from "./drafts/PostViewPopup";




type PostViewSectionProps = {
    heading?: React.ReactNode;
    className?: string;
    contentClassName?: string;
    customContent?: React.ReactNode;
    scheduled?: boolean;
}


export default function PostViewSection({ className, heading, contentClassName, customContent = null, scheduled = true }: PostViewSectionProps) {
    const [imageStatus, setImageStatus] = useState<PostStatus>(PostStatus.GENERATED);

    const onRegenerateClicked = () => {
        setImageStatus(PostStatus.GENERATING);
        setTimeout(() => {
            setImageStatus(PostStatus.GENERATED);
        }, 4000);
    }

    return (
        <GrBorderBox className={cn(
            "p-px md:p-[2px] rounded-20 lg:max-w-[400px] lg:max-h-[calc(100vh_-_130px)]",
            className
        )} type="lg">
            <div className={cn(
                "backdrop-blur-[10px] bg-gr-purple opacity-90 rounded-20 relative",
                "md:min-w-[300px] h-full min-h-[500px] px-5 md:px-[30px] py-10",
                "relative overflow-hidden",
                contentClassName
            )}>
                <div id="hello" data-expanded="true">

                </div>
                {/* Top Center Stick Design  */}
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 bg-primary w-[80%] h-[8px] stick-shadow"></div>
                {/* Main Content  */}
                {
                    (customContent !== null) ? customContent
                        :
                        <div className="h-full flex overflow-y-auto flex-col justify-between gap-28 no-scrollbar pb-20">
                            <div className="">
                                {heading}
                                <p className="mt-7 font-light text-base text-th-gray font-jakarta">
                                    Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat.
                                </p>
                                <ImageEl
                                    showLoading={imageStatus === PostStatus.GENERATING}
                                    src="/images/today-post.png" loading="lazy"
                                    containerClassName="mt-6"
                                    className="object-cover object-center aspect-video w-full lg:h-[264px]" />
                                {
                                    scheduled &&
                                    <>
                                        <p className="my-3 text-xs text-white font-bold font-jakarta">
                                            <span>Date: </span>
                                            <span className="font-medium">April 2022, Sunday 2:00PM</span>
                                        </p>
                                        <Seperator />
                                        <div className="mt-[14px] flex items-center gap-3">
                                            <SecondaryBtn className="px-2 xs:px-4">
                                                <FontAwesomeIcon icon={faCalendar} />
                                                Reschedule
                                            </SecondaryBtn>
                                            <SecondaryBtn className="px-2 xs:px-4">
                                                <FontAwesomeIcon icon={faEdit} />
                                                Edit
                                            </SecondaryBtn>
                                            <SecondaryBtn className="px-2 xs:px-4">
                                                <FontAwesomeIcon icon={faTrash} />
                                                Delete
                                            </SecondaryBtn>
                                        </div>
                                    </>
                                }

                            </div>
                            {/* Buttons  */}
                            <GrBorderBox className="p-[1px] absolute w-full bottom-0 left-0 ">
                                <div className="bg-gr-purple backdrop-blur-3xl p-5 flex items-center gap-4">
                                    <SecondaryBtn onClick={onRegenerateClicked} filled={false} className="border-white/10 py-3 w-1/2">
                                        Regenerate Image
                                    </SecondaryBtn>
                                    <PrimaryBtn className="py-3 w-1/2 h-full">
                                        Send Now
                                    </PrimaryBtn>
                                </div>
                            </GrBorderBox>
                        </div>
                }
            </div>
        </GrBorderBox>
    );
}





type ScheduleListItemProps = {
    leading?: React.ReactNode;
    className?: string;
    onItemClick?: () => void;
}

export function ScheduleListItem({ leading, className, onItemClick }: ScheduleListItemProps) {
    return (
        <div className={cn(
            "w-full bg-[#f2e4f11a] px-3 py-[10px] md:rounded-10 gap-[10px]",
            "grid grid-cols-6 place-items-center",
            className
        )}>
            <div className="col-span-2 md:col-span-1 w-full min-w-max">
                {leading}
            </div>
            <div className="col-span-4 w-full">
                {/* <SmallSchedulePostEl text="@moonlanding.media" icon={faTwitter} />
                <SmallSchedulePostEl text="@moonlanding.media" icon={faFacebook} />
                <SmallSchedulePostEl text="+1" keepVisible /> */}
                <OverflowList
                    className="gap-2"
                    collapseFrom="end"
                    minVisibleItems={0}
                    items={[
                        {
                            text: "@moonlanding.media",
                            icon: faTwitter
                        },
                        {
                            text: "@moonlanding.media",
                            icon: faFacebook
                        },
                        {
                            text: "@moonlanding.media",
                            icon: faTwitter
                        },
                    ]}
                    itemRenderer={(item) => (
                        <SmallSchedulePostEl onClick={onItemClick} text={item.text} icon={item.icon} />
                    )}
                    overflowRenderer={(items) => (
                        <SmallSchedulePostEl hasPost={false} text={`+${items.length}`} keepVisible />
                    )}
                />
            </div>
        </div>
    );
}


type SmallSchedulePostElProps = {
    text?: string;
    icon?: IconDefinition;
    keepVisible?: boolean;
    onClick?: () => void;
    hasPost?: boolean;
}

export function SmallSchedulePostEl({ text, icon, onClick, hasPost = true, keepVisible }: SmallSchedulePostElProps) {
    // hidden xs:inline-flex first:inline-flex last:inline-flex
    return (
        hasPost ?
            <PostViewPopup
                trigger={({ open }) => (
                    <PrimaryBtnNeon onClick={open} className="text-base text-th-gray">
                        {
                            icon && <FontAwesomeIcon icon={icon} />
                        }
                        {
                            text &&
                            <span className={cn(
                                "max-w-[200px] min-w-[20px]",
                                !keepVisible && "overflow-hidden text-ellipsis whitespace-nowrap"
                                // !keepVisible && "hidden md:inline text-ellipsis overflow-hidden"
                            )}>
                                {text}
                            </span>
                        }
                    </PrimaryBtnNeon>
                )} />
            :
            <PrimaryBtnNeon onClick={onClick} className="text-base text-th-gray">
                {
                    icon && <FontAwesomeIcon icon={icon} />
                }
                {
                    text &&
                    <span className={cn(
                        "max-w-[200px] min-w-[20px]",
                        !keepVisible && "overflow-hidden text-ellipsis whitespace-nowrap"
                        // !keepVisible && "hidden md:inline text-ellipsis overflow-hidden"
                    )}>
                        {text}
                    </span>
                }
            </PrimaryBtnNeon>
    );
}



