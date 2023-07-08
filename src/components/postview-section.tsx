import { IconDefinition, faCalendar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../lib/utils";
import { SecondaryBtn, PrimaryBtn, PrimaryBtnNeon } from "./ui/buttons";
import GrBorderBox from "./ui/gr-border-box";
import { Seperator } from "./ui/seperator";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { OverflowList } from "react-overflow-list";
import ImageEl from "./ImageEl";
import { useState, useEffect } from "react";
import { PostStatus } from "@/pages/GenerateContent";
import PostViewPopup from "./drafts/PostViewPopup";
import { changeImageUrl, sortScheduledContents } from '@/lib/utils'
import WarningPopup from "@/components/WarningPopup";
import AddEditDraftPopup from "@/components/drafts/AddEditDraftPopup";

import {
  useLoaderData,
} from 'react-router-dom'

import {
  userApiClient,
  twitterUserApiClient,
  contentApiClient,
  imageApiClient,
} from '@/api.env'



type PostViewSectionProps = {
    heading?: React.ReactNode;
    className?: string;
    contentClassName?: string;
    customContent?: React.ReactNode;
    scheduled?: boolean;
    content?: any
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
    tips?: string
}


export default function PostViewSection({ className, heading, contentClassName, customContent = null, scheduled = true, content, deleteNumber, setDeleteNumber, tips }: PostViewSectionProps) {
    const [imageStatus, setImageStatus] = useState<PostStatus>(PostStatus.GENERATED);
    const [image, setImage] = useState<any>(content?.image);
    const [sendStatus, setSendStatus] = useState<string>('');
    // const [isGenerateImage, setIsGenerateImage] = useState<boolean>(false);
    // const [content, setContent] = useState<any>(null);

    const pageData: any = useLoaderData();
    // console.log({pageData});

    const onRegenerateClicked = () => {
        setImageStatus(PostStatus.GENERATING);

        // contentApiClient.contentsCreateImage({id: content.id}).then((r) => {
        imageApiClient.imagesCreateImage({id: content.id}).then((r) => {
          // console.log(r);
          setImage(r.imageUrl);
          if (deleteNumber !== undefined) {
            let lastNumber = deleteNumber + 1;
            setDeleteNumber && setDeleteNumber(lastNumber);
            // console.log('update deleteNumber');
          }
        }).finally(() => {
            setImageStatus(PostStatus.GENERATED);
        });

        // setTimeout(() => {
        //     setImageStatus(PostStatus.GENERATED);
        // }, 4000);
    }

    // const onRegenerateClicked = () => {
    //     setImageStatus(PostStatus.GENERATING);
    //     setTimeout(() => {
    //         setImageStatus(PostStatus.GENERATED);
    //     }, 4000);
    // }

    function onDeleteContent(): void {
      if (content) {
        console.log(`Delete content: ${content.id}`);
        contentApiClient.contentsDelete({id: content.id}).then((r) => {
          // console.log(r);
          // contentApiClient.contentsScheduled().then((r) => {
          //   // console.log(r.results);
          //   if (r.results) {
          //     // setContent(r.results[0]);
          //   } else {
          //     // setContent(null);
          //   }
          //   window.location.reload();
          //   // return r.results;
          // });

          if (deleteNumber !== undefined) {
            deleteNumber = deleteNumber + 1;
            setDeleteNumber && setDeleteNumber(deleteNumber);
            // console.log('update deleteNumber');
          }
        });
      }
    }

    function onClickSendNow(): void {
      if (content) {
        setSendStatus('sending');

        console.log(`Send content: ${content.id}`);
        contentApiClient.contentsSend({id: content.id}).then((r) => {
          console.log(r);

          const msg_class = 'text-green-500';
          const message = `Send the draft successfully`;
          // setMessage(message);
          // setMessageClass(msg_class);
          // setSendStatus('sent');
          setSendStatus('');

          if (setDeleteNumber && deleteNumber != undefined) {
            deleteNumber = deleteNumber + 1;
            setDeleteNumber(deleteNumber);
          }
        }).catch((e) => {
          const msg_class = 'text-red-500';
          const message = `Failed to send the draft`;
          // setMessage(message);
          // setMessageClass(msg_class);
          setSendStatus('');
        });
      }
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
                                  {/* pageData?.page === 'home' ? pageData?.latestContents[0]?.text || 'No any content' : '' */}
                                  {/* pageData?.page === 'home' && pageData?.latestContents[0]?.text && setContent(pageData?.latestContents[0]) */}
                                  { content?.text || tips || 'No any content' }
                                </p>
                                {
                                  // pageData?.page === 'home' && pageData?.latestContents[0]?.image ?
                                  // <ImageEl
                                  //     showLoading={imageStatus === PostStatus.GENERATING}
                                  //     src={pageData?.latestContents[0]?.image} loading="lazy"
                                  //     containerClassName="mt-6"
                                  //     className="object-cover object-center aspect-video w-full lg:h-[264px]" />
                                  // :
                                  // ''

                                  image ?
                                    <ImageEl
                                        showLoading={imageStatus === PostStatus.GENERATING}
                                        src={image || changeImageUrl("/images/today-post.png")} loading="lazy"
                                        containerClassName="mt-6"
                                        className="object-cover object-center aspect-video w-full lg:h-[264px]" />
                                    : imageStatus === PostStatus.GENERATING ?
                                    <ImageEl
                                        showLoading={imageStatus === PostStatus.GENERATING}
                                        src="" alt="No Image" loading="lazy"
                                        containerClassName="mt-6"
                                        className="object-cover object-center aspect-video w-full lg:h-[264px]" />
                                      : ''

                                  // content?.image ?
                                  // <ImageEl
                                  //     showLoading={imageStatus === PostStatus.GENERATING}
                                  //     src={content?.image} loading="lazy"
                                  //     containerClassName="mt-6"
                                  //     className="object-cover object-center aspect-video w-full lg:h-[264px]" />
                                  // :
                                  // ''
                                }
                                {
                                    scheduled &&
                                    <>
                                        <p className="my-3 text-xs text-white font-bold font-jakarta">
                                            <span>Date: </span>
                                            {/*<span className="font-medium">{ pageData?.page === 'home' ? pageData?.latestContents[0]?.createdTime?.toLocaleString() || '' : '' }</span>*/}
                                            {/*<span className="font-medium">{ content?.createdTime?.toLocaleString() || '' }</span>*/}
                                            <span className="font-medium">{ content?.scheduleTime?.toLocaleString() || '' }</span>
                                          
                                        </p>
                                        <Seperator />
                                        <div className="mt-[14px] flex items-center gap-3">
                                            {/*
                                            <SecondaryBtn className="px-2 xs:px-4">
                                                <FontAwesomeIcon icon={faCalendar} />
                                                Reschedule
                                            </SecondaryBtn>
                                            <SecondaryBtn className="px-2 xs:px-4">
                                                <FontAwesomeIcon icon={faEdit} />
                                                Edit
                                            </SecondaryBtn>
                                              */}

                                            <AddEditDraftPopup variant="edit" content={content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} hasWord={true}
                                              newWords={'Reschedule'}
                                              className={"px-2 xs:px-4"}
                                              hasParent={false}
                                              disabled={content ? false : true }
                                            />
                                            <AddEditDraftPopup variant="edit" content={content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} hasWord={true}
                                              className={"px-2 xs:px-4"}
                                              hasParent={false}
                                              disabled={content ? false : true }
                                            />

                                           {/*
                                            <SecondaryBtn className="px-2 xs:px-4" onClick={onDeleteContent}>
                                                <FontAwesomeIcon icon={faTrash} />
                                                Delete
                                            </SecondaryBtn>
                                             */}
                                            <WarningPopup
                                                heading="Are you sure you want to delete this post?"
                                                // description={ pageData?.page === 'home' ? pageData?.latestContents[0]?.text || 'No any content' : '' }
                                                description={ content?.text || 'No any content' }
                                                negativeText="Cancel"
                                                positiveText="Yes, Delete"
                                                trigger={({ open }) => (
                                                    <SecondaryBtn disabled={content ? false : true } onClick={open} className="p-3">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                        Delete
                                                    </SecondaryBtn>
                                                )}
                                              onClickPositiveTextButton={onDeleteContent}
                                            />
                                        </div>
                                    </>
                                }

                            </div>
                            {/* Buttons  */}
                            <GrBorderBox className="p-[1px] absolute w-full bottom-0 left-0 ">
                                <div className="bg-gr-purple backdrop-blur-3xl p-5 flex items-center gap-4">
                                    <SecondaryBtn onClick={onRegenerateClicked} filled={false} className="border-white/10 py-3 w-1/2"
                                      disabled={imageStatus === PostStatus.GENERATING || ! content}
                                    >
                                        {image ? 'Regenerate Image' : 'Generate Image'}
                                    </SecondaryBtn>
                                    {/*
                                    <PrimaryBtn className="py-3 w-1/2 h-full">
                                        Send Now
                                    </PrimaryBtn>
                                      */}
                                    {
                                      sendStatus === '' ?
                                        <PrimaryBtn disabled={content ? false : true } className="py-3 w-1/2 h-full" onClick={onClickSendNow}>
                                            Send Now
                                        </PrimaryBtn>
                                        : sendStatus === 'sending' ? 
                                          <PrimaryBtn disabled={true} className="py-3 w-1/2 h-full">
                                              Sending...
                                          </PrimaryBtn>
                                        : ''
                                    }
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
    items?: Array<any>;
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
}

export function ScheduleListItem({ leading, className, onItemClick, items, deleteNumber, setDeleteNumber }: ScheduleListItemProps) {
    // const pageData: any = useLoaderData();
    // console.log({pageData});

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
                    minVisibleItems={1}
                    items={items || [
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
                        <SmallSchedulePostEl onClick={onItemClick} text={item.text} icon={item.icon} content={item.content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} />
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
    content?: any;
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
}

export function SmallSchedulePostEl({ text, icon, onClick, hasPost = true, keepVisible, content, deleteNumber, setDeleteNumber }: SmallSchedulePostElProps) {
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
                                "max-w-[100px] md:max-w-[200px] min-w-[20px]",
                                !keepVisible && "overflow-hidden text-ellipsis whitespace-nowrap"
                                // !keepVisible && "hidden md:inline text-ellipsis overflow-hidden"
                            )}>
                                {text}
                            </span>
                        }
                    </PrimaryBtnNeon>
                )}
              content={content}
              deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber}
            />
            :
            <PrimaryBtnNeon onClick={onClick} className="text-base text-th-gray">
                {
                    icon && <FontAwesomeIcon icon={icon} />
                }
                {
                    text &&
                    <span className={cn(
                        "max-w-[100px] md:max-w-[200px] min-w-[20px]",
                        !keepVisible && "overflow-hidden text-ellipsis whitespace-nowrap"
                        // !keepVisible && "hidden md:inline text-ellipsis overflow-hidden"
                    )}>
                        {text}
                    </span>
                }
            </PrimaryBtnNeon>
    );
}



