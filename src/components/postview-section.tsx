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
    contents?: any[]
}


export default function PostViewSection({ className, heading, contentClassName, customContent = null, scheduled = true, content, deleteNumber, setDeleteNumber, tips, contents }:
  PostViewSectionProps) {
    const [imageStatus, setImageStatus] = useState<PostStatus>(PostStatus.GENERATED);
    const [sendStatus, setSendStatus] = useState<string>('');
    // const [isGenerateImage, setIsGenerateImage] = useState<boolean>(false);
    // const [content, setContent] = useState<any>(null);

    const pageData: any = useLoaderData();
    // console.log({pageData});

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentContent, setCurrentContent] = useState<any>(content);
    setCurrentContent(content);

    if (contents && contents.length > 0) {
      if (contents.indexOf(content) > -1) {
        setCurrentIndex(contents.indexOf(content));
      } else {
        content = contents[currentIndex];
        setCurrentContent(content);
      }
    }

    const [image, setImage] = useState<any>(content?.image);
    if (contents) {
      setImage(currentContent?.image);
    } else {
      setImage(content?.image);
    }

    function onClickLeftArrowBtn() {
      let newIndex = currentIndex - 1;
      if (newIndex < 0 && contents) {
        newIndex = contents.length - 1;
      }
      setCurrentIndex(newIndex);
      // console.log('Clicked left arrow: ', currentIndex);

      if (contents) {
        const newContent = contents[currentIndex]
        setCurrentContent(newContent);
        let newImage = newContent.image;
        setImage(newImage);
      }
    }

    function onClickRightArrowBtn() {
      let newIndex = currentIndex + 1;
      if (contents && newIndex > contents.length - 1) {
        newIndex = 0;
      }
      setCurrentIndex(newIndex);
      // console.log('Clicked right arrow: ', currentIndex);

      if (contents) {
        const newContent = contents[currentIndex]
        setCurrentContent(newContent);
        let newImage = newContent.image;
        setImage(newImage);
        // console.log('Current image: ', image);
        // console.log('content image: ', newContent.image);
      }
    }

    const onRegenerateClicked = () => {
        setImageStatus(PostStatus.GENERATING);

        // contentApiClient.contentsCreateImage({id: content.id}).then((r) => {
        imageApiClient.imagesCreateImage({id: currentContent.id}).then((r) => {
          // console.log(r);
          let newImage = r.imageUrl;
          setImage(newImage);
          // setCurrentContent(r);
          // console.log('Current image: ', image);
          // console.log('result image: ', newImage);

          if (contents) {
            // console.log(`contents before changing:`, contents);

            let newContent = contents[currentIndex];
            newContent.image = r.imageUrl;
            contents[currentIndex] = newContent;
            setCurrentContent(newContent);

            // console.log('new Content: ', newContent);
            // console.log('Current image: ', image);
            // console.log('content image: ', newContent.image);
            //
            // console.log(`contents after changing:`, contents);
          }

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

    function onGenerateBeautifulImage(): void {
      setImageStatus(PostStatus.GENERATING);

      // contentApiClient.contentsCreateImage({id: currentContent.id}).then((r) => {
      // console.log(`imageUrl before: ${image}`);
      const imagesCreateImageVarRequest = {
        content: currentContent.id,
        method: 'midjourney',
      }
      imageApiClient.imagesCreateImageVar(imagesCreateImageVarRequest).then((r) => {
        // console.log('generate image: ', r);
        setImage(r[0].imageUrl);
        // console.log('Current image: ', image);

        if (contents) {
          // console.log(`contents before changing:`, contents);

          let newContent = contents[currentIndex];
          newContent.image = r[0].imageUrl;
          contents[currentIndex] = newContent;
          setCurrentContent(newContent);

          // console.log('Current image: ', image);
          // console.log('content image: ', newContent.image);
          //
          // console.log(`contents after changing:`, contents);
        }
        // console.log(`imageUrl after: ${image}`);

        if (deleteNumber !== undefined) {
          deleteNumber = deleteNumber + 1;
          setDeleteNumber && setDeleteNumber(deleteNumber);
          // console.log('update deleteNumber');
        }
      }).finally(() => {
          setImageStatus(PostStatus.GENERATED);
      });
    }

    // const onRegenerateClicked = () => {
    //     setImageStatus(PostStatus.GENERATING);
    //     setTimeout(() => {
    //         setImageStatus(PostStatus.GENERATED);
    //     }, 4000);
    // }

    function onDeleteContent(): void {
      if (currentContent) {
        console.log(`Delete content: ${currentContent.id}`);
        contentApiClient.contentsDelete({id: currentContent.id}).then((r) => {
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

          if (contents && contents.length > 0) {
            // remove current content
            contents.splice(currentIndex, 1);

            // check remaining content list
            if (contents.length <= 0) {
              // get new current content
              setCurrentContent(null);
              setImage(null);
            } else {
              if (currentIndex >= contents.length - 1) {
                setCurrentIndex(0);
              }

              // get new current content
              setCurrentContent(contents[currentIndex]);
              setImage(contents[currentIndex].image);
            }
          }

          if (deleteNumber !== undefined) {
            deleteNumber = deleteNumber + 1;
            setDeleteNumber && setDeleteNumber(deleteNumber);
            // console.log('update deleteNumber');
          }
        });
      }
    }

    function onClickSendNow(): void {
      if (currentContent) {
        setSendStatus('sending');

        console.log(`Send content: ${currentContent.id}`);
        contentApiClient.contentsSend({id: currentContent.id}).then((r) => {
          console.log(r);

          const msg_class = 'text-green-500';
          const message = `Send the draft successfully`;
          // setMessage(message);
          // setMessageClass(msg_class);
          // setSendStatus('sent');
          setSendStatus('');

          if (contents && contents.length > 0) {
            // remove current content
            contents.splice(currentIndex, 1);

            // check remaining content list
            if (contents.length <= 0) {
              // get new current content
              setCurrentContent(null);
              setImage(null);
            } else {
              if (currentIndex >= contents.length - 1) {
                setCurrentIndex(0);
              }

              // get new current content
              setCurrentContent(contents[currentIndex]);
              setImage(contents[currentIndex].image);
            }
          }

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

                { contents && contents.length > 0 &&
                  <div className="flex justify-between">
                    {/* left arrow */}
                      {/*<button className="absolute top-4 left-6">*/}
                    <button className="" onClick={onClickLeftArrowBtn} disabled={imageStatus === PostStatus.GENERATING}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-white fill-white opacity-70">
                        <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <span className="text-white opacity-70">
                      {`(${currentIndex + 1} of ${contents.length})`}
                    </span>

                    {/* right arrow */}
                    <button className="" onClick={onClickRightArrowBtn} disabled={imageStatus === PostStatus.GENERATING}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-white fill-white opacity-70">
                        <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                }

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
                                  {/* pageData?.page === 'home' ? pageData?.latestContents[0]?.text || 'No content' : '' */}
                                  {/* pageData?.page === 'home' && pageData?.latestContents[0]?.text && setContent(pageData?.latestContents[0]) */}
                                  { currentContent?.text || tips || 'No content' }
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
                                            <span className="font-medium">{ currentContent?.scheduleTime?.toLocaleString() || '' }</span>
                                          
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

                                            <AddEditDraftPopup variant="edit" content={currentContent} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} hasWord={true}
                                              newWords={'Reschedule'}
                                              className={"px-2 xs:px-4"}
                                              hasParent={false}
                                              disabled={currentContent ? false : true }
                                            />
                                            <AddEditDraftPopup variant="edit" content={currentContent} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} hasWord={true}
                                              className={"px-2 xs:px-4"}
                                              hasParent={false}
                                              disabled={currentContent ? false : true }
                                            />

                                           {/*
                                            <SecondaryBtn className="px-2 xs:px-4" onClick={onDeleteContent}>
                                                <FontAwesomeIcon icon={faTrash} />
                                                Delete
                                            </SecondaryBtn>
                                             */}
                                            <WarningPopup
                                                heading="Are you sure you want to delete this post?"
                                                // description={ pageData?.page === 'home' ? pageData?.latestContents[0]?.text || 'No content' : '' }
                                                description={ currentContent?.text || 'No content' }
                                                negativeText="Cancel"
                                                positiveText="Yes, Delete"
                                                trigger={({ open }) => (
                                                    <SecondaryBtn disabled={currentContent ? false : true } onClick={open} className="p-3">
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
                                    <SecondaryBtn onClick={onGenerateBeautifulImage} filled={false} className="border-white/10 py-3 w-1/2"
                                      disabled={imageStatus === PostStatus.GENERATING || ! currentContent}
                                    >
                                        {image ? 'Regenerate Image' : 'Generate Image'}
                                    </SecondaryBtn>
                                    {/*
                                    <PrimaryBtn className="py-3 w-1/2 h-full">
                                        Post Now
                                    </PrimaryBtn>
                                      */}
                                    {
                                      sendStatus === '' ?
                                        <PrimaryBtn disabled={(currentContent ? false : true) ||  (imageStatus === PostStatus.GENERATING)} className="py-3 w-1/2 h-full" onClick={onClickSendNow}>
                                            Post Now
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
    setContent?: (content: any) => void
    hasClickBtn?: boolean | undefined;
}

export function ScheduleListItem({ leading, className, onItemClick, items, deleteNumber, setDeleteNumber, setContent, hasClickBtn = false }: ScheduleListItemProps) {
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
                        <SmallSchedulePostEl onClick={onItemClick} text={item.text} icon={item.icon} content={item.content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber}
                          onClickBtn= {
                            hasClickBtn ? () => {
                              console.log('Set content');
                              setContent && setContent(item.content);
                            } : undefined
                          }
                        />
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
    onClickBtn?: () => void;
}

export function SmallSchedulePostEl({ text, icon, onClick, hasPost = true, keepVisible, content, deleteNumber, setDeleteNumber, onClickBtn }: SmallSchedulePostElProps) {
    // hidden xs:inline-flex first:inline-flex last:inline-flex
    return (
        hasPost ?
            <PostViewPopup
                trigger={({ open }) => (
                  <PrimaryBtnNeon onClick={onClickBtn ? onClickBtn : open} className="text-base text-th-gray">
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



