import { faClock, faEdit, faSquareArrowUpRight, faT, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { cn } from "@/lib/utils"
import GrBorderBox from "../ui/gr-border-box"
import { InputEl, InputElWChips } from "../ui/input"
import SelectEl from "../ui/selectel"
import { TextAreaEl } from "../ui/textarea"
import { PostStatus } from "@/pages/GenerateContent"
import ImageEl from "../ImageEl"
import { changeImageUrl } from '@/lib/utils'
import { profileContext } from '@/App'
import { useContext, useEffect, useRef } from "react"
import { DateTime } from "luxon";

import {
  scheduleApiClient,
  contentApiClient,
  imageApiClient,
} from '@/api.env'

import {
  noTopicString,
  allTopicString,
} from '@/pages/Drafts'





type Props = {
    variant: "edit" | "add"
    content?: any
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
    hasWord?: boolean | undefined
    newWords?: string | undefined
    className?: string | undefined
    hasParent?: boolean | undefined
}

export default function AddEditDraftPopup({ variant = "add", content, deleteNumber, setDeleteNumber, hasWord, newWords, className, hasParent = true }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageStatus, setImageStatus] = useState<PostStatus>(PostStatus.GENERATED);

    const [timezone, setTimezone] = useState<any>('');
    const [schedule, setSchedule] = useState<any>(null);
    // const imageUrl = content?.image;
    const [image, setImage] = useState<any>('');

    const [localContent, setLocalContent] = useState<any>(content);

    const [message, setMessage] = useState<string>('');
    const [messageClass, setMessageClass] = useState<string>('');
    const [scheduleMessage, setScheduleMessage] = useState<string>('');
    const [scheduleMessageClass, setScheduleMessageClass] = useState<string>('');

    const dateRef: any = useRef(null);
    const timeRef: any = useRef(null);
    const textRef: any = useRef(null);
    const isGenerateImage = useRef<boolean>(false);

    let updateNumber: any;
    if (deleteNumber != undefined) {
      updateNumber = useRef<number>(deleteNumber);
    } else {
      updateNumber = useRef<number>(0);
    }
    // const updateNumber = useRef<number | undefined>(deleteNumber);

    const profile: any = useContext(profileContext);

    const onRegenerateClicked = () => {
        const contentText = textRef.current?.value;

        if (content) {  // update existing content
          console.log('Generate image for existing content');

          // first submit content
          onSubmit();
          if (contentText && contentText.trim()) {  // there is content
            setImageStatus(PostStatus.GENERATING);

            // contentApiClient.contentsCreateImage({id: content.id}).then((r) => {
            imageApiClient.imagesCreateImage({id: content.id}).then((r) => {
              // console.log(r);
              setImage(r.imageUrl);
              if (deleteNumber !== undefined) {
                updateNumber.current = updateNumber.current + 1;
                setDeleteNumber && setDeleteNumber(updateNumber.current);
                // console.log('update deleteNumber');
              }
            }).finally(() => {
                setImageStatus(PostStatus.GENERATED);
            });

            // setTimeout(() => {
            //     setImageStatus(PostStatus.GENERATED);
            // }, 4000);
          } else {
            console.log('No content');

            const msg_class = 'text-red-500';
            const message = 'No any content, please input some';
            setMessage(message);
            setMessageClass(msg_class);
          }
        } else { // create new content
          console.log('Save draft and generate image for new content');
          if (contentText && contentText.trim()) {  // there is content
            isGenerateImage.current = true;
            // console.log(`isGenerateImage before: ${isGenerateImage.current}`);
            onSubmit();
          } else {
            console.log('No content');

            const msg_class = 'text-red-500';
            const message = 'No any content, please input some';
            setMessage(message);
            setMessageClass(msg_class);
          }
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setImage(content?.image);
        setIsOpen(true);
        console.log(`image url: ${image}`);

        setMessage('');
        setMessageClass('');
        setScheduleMessage('');
        setScheduleMessageClass('');
        setLocalContent(content);
        isGenerateImage.current = false;
    }

    useEffect(() => {
      async function startFetching() {
        // setContentResult(null);
        let result = null;
        if (content?.statusText === 'Scheduled') {
          result = await scheduleApiClient.schedulesRead({id: content.id}).then((r) => {
            console.log(r);
            // setLocalContent(r);
            return r;
          }).catch((e) => {
            console.log(e);
            // console.log(`content: ${content}`);
          });
        }

        if (!ignore) {
          if (result) {
              console.log(`schedule: ${result.schedule}`);
              setSchedule(result.schedule);
              setTimezone(result.timezoneText);
            }

          if (! result) {
            setSchedule(null);
            setTimezone('');
          }
        }
      }

      // console.log('Running useEffect');
      // console.log(`imageStatus: ${imageStatus}`);
      //
      // if (imageStatus === PostStatus.GENERATING) {
      //   console.log('Do not update content when generating image');
      //   return () => {};
      // }

      let ignore = false;
      startFetching();
      return () => {
        ignore = true;
      }
    }, [localContent]);

    function createOrUpdateSchedule(timezoneText: string, dateText: string, timeText: string, content: any) {
      // schedule draft
      if (schedule) { // update schedule
        if (timezoneText && dateText && timeText) {
          console.log(`Update schedule for content: ${content.id}`);

          const dateFormat = `${dateText}T${timeText}`;
          console.log(`dateFormat: ${dateFormat}`);
          const userDate = DateTime.fromISO(dateFormat, {zone: timezoneText});
          // const userDate = DateTime.fromISO(dateFormat, {zone: profile.timezoneText});
          const userDateStr = userDate.toISO();
          const userLocalDateStr = userDate.toLocal().toISO();
          console.log(`userDateStr: ${userDateStr}, userLocalDateStr: ${userLocalDateStr}`);

          if (userDateStr && userLocalDateStr) {
            const scheduleDate = new Date(userDateStr);
            // const userScheduleTime = new Date(userLocalDateStr);
            const userScheduleTime = new Date(dateFormat);

            const scheduleForTwitterPost = {
              content: content.id,
              // schedule: userDate,
              // userScheduleTime: userDate,
              schedule: scheduleDate,
              userScheduleTime: dateFormat,
              status: schedule.status,
              timezone: profile.timezone,
              // timezoneText: timezoneText,
            };
            const schedulesUpdateRequest = {
              id: content.id,
              data: scheduleForTwitterPost,
            };
            console.log(schedulesUpdateRequest);

            scheduleApiClient.schedulesUpdate(schedulesUpdateRequest).then((r) => {
              console.log('Updated schedule');
              console.log(r);

              const msg_class = 'text-green-500';
              const message = `Updated the schedule successfully`;
              setScheduleMessage(message);
              setScheduleMessageClass(msg_class);
              setSchedule(scheduleDate);
            }).catch((e) => {
              console.log(e);

              const msg_class = 'text-red-500';
              const message = `Failed to update the schedule`;
              setScheduleMessage(message);
              setScheduleMessageClass(msg_class);
            }).finally(() => {
              if (deleteNumber !== undefined) {
                updateNumber.current = updateNumber.current + 1;
                setDeleteNumber && setDeleteNumber(updateNumber.current);
                // console.log('update deleteNumber');
              }
            });
          } else {
            const scheduleMessage = 'Wrong date format';
            const msg_class = 'text-red-500';
            setScheduleMessage(scheduleMessage);
            setScheduleMessageClass(msg_class);
          }
        } else {
          console.log('Timezone, date or time is blank');
        }
      } else {  // create new schedule
        console.log(`Create schedule for content: ${content.id}`);
        // scheduleApiClient.schedulesCreate().then().catch().finally();
        if (timezoneText && dateText && timeText) {
          console.log(`Update schedule for content: ${content.id}`);

          const dateFormat = `${dateText}T${timeText}`;
          console.log(`dateFormat: ${dateFormat}`);
          const userDate = DateTime.fromISO(dateFormat, {zone: timezoneText});
          // const userDate = DateTime.fromISO(dateFormat, {zone: profile.timezoneText});
          const userDateStr = userDate.toISO();
          const userLocalDateStr = userDate.toLocal().toISO();
          console.log(`userDateStr: ${userDateStr}, userLocalDateStr: ${userLocalDateStr}`);

          if (userDateStr && userLocalDateStr) {
            const scheduleDate = new Date(userDateStr);
            // const userScheduleTime = new Date(userLocalDateStr);
            const userScheduleTime = new Date(dateFormat);

            const scheduleForTwitterPost = {
              content: content.id,
              // schedule: userDate,
              // userScheduleTime: userDate,
              schedule: scheduleDate,
              userScheduleTime: dateFormat,
              timezone: profile.timezone,
              // timezoneText: timezoneText,
            };
            const schedulesCreateRequest = {
              data: scheduleForTwitterPost,
            };
            console.log(schedulesCreateRequest);

            scheduleApiClient.schedulesCreate(schedulesCreateRequest).then((r) => {
              console.log('Created schedule');
              console.log(r);

              const msg_class = 'text-green-500';
              const message = `Created the schedule successfully`;
              setScheduleMessage(message);
              setScheduleMessageClass(msg_class);
              setSchedule(scheduleDate);
            }).catch((e) => {
              console.log(e);

              const msg_class = 'text-red-500';
              const message = `Failed to create the schedule`;
              setScheduleMessage(message);
              setScheduleMessageClass(msg_class);
            }).finally(() => {
              if (deleteNumber !== undefined) {
                updateNumber.current = updateNumber.current + 1;
                setDeleteNumber && setDeleteNumber(updateNumber.current);
                // console.log('update deleteNumber');
              }
            });
          } else {
            const scheduleMessage = 'Wrong date format';
            const msg_class = 'text-red-500';
            setScheduleMessage(scheduleMessage);
            setScheduleMessageClass(msg_class);
          }
        } else {
          console.log('Timezone, date or time is blank');
        }
      }
    }

    function onSubmit() {
      const contentSelector = '#content-text';
      const timezoneSelector = "#headlessui-listbox-button-P0-1";
      const dateSelector = 'input[type="date"]';
      const timeSelector = 'input[type="time"]';

      const contentText = (document.querySelector(contentSelector) as HTMLInputElement).value;
      // const timezoneText = (document.querySelector(timezoneSelector) as HTMLInputElement).textContent;
      const timezoneText = profile.timezoneText;
      const dateText = (document.querySelector(dateSelector) as HTMLInputElement).value;
      const timeText = (document.querySelector(timeSelector) as HTMLInputElement).value;

      console.log(`timezone: ${timezoneText}, date: ${dateText}, time: ${timeText}, content: ${contentText}`);

      if (content) {  // edit existing content
        const contentForTwitterPost = {
          id: content.id,
          text: contentText,
          status: content.status,
          project: content.project,
          topic: content.topic,
        }
        const contentsUpdateRequest = {
              id: content.id,
              data: contentForTwitterPost,
        }

        contentApiClient.contentsUpdate(contentsUpdateRequest).then((r) => {
          console.log(r);

          const msg_class = 'text-green-500';
          // const message = `Updated the draft(${content.id}) successfully`;
          const message = `Updated the draft successfully`;
          setMessage(message);
          setMessageClass(msg_class);
          setLocalContent(r);
        }).catch((r) => {
          console.log(r);

          const msg_class = 'text-red-500';
          // const message = `Failed to updated the draft(${content.id})`;
          const message = `Failed to updated the draft`;
          setMessage(message);
          setMessageClass(msg_class);
        }).finally(() => {
          if (deleteNumber !== undefined) {
            updateNumber.current = updateNumber.current + 1;
            setDeleteNumber && setDeleteNumber(updateNumber.current);
            // console.log('update deleteNumber');
          }
        });

        // schedule draft
        if (schedule) { // update schedule
          if (timezoneText && dateText && timeText) {
            console.log(`Update schedule for content: ${content.id}`);

            const dateFormat = `${dateText}T${timeText}`;
            console.log(`dateFormat: ${dateFormat}`);
            const userDate = DateTime.fromISO(dateFormat, {zone: timezoneText});
            // const userDate = DateTime.fromISO(dateFormat, {zone: profile.timezoneText});
            const userDateStr = userDate.toISO();
            const userLocalDateStr = userDate.toLocal().toISO();
            console.log(`userDateStr: ${userDateStr}, userLocalDateStr: ${userLocalDateStr}`);

            if (userDateStr && userLocalDateStr) {
              const scheduleDate = new Date(userDateStr);
              // const userScheduleTime = new Date(userLocalDateStr);
              const userScheduleTime = new Date(dateFormat);

              const scheduleForTwitterPost = {
                content: content.id,
                // schedule: userDate,
                // userScheduleTime: userDate,
                schedule: scheduleDate,
                userScheduleTime: dateFormat,
                status: schedule.status,
                timezone: profile.timezone,
                // timezoneText: timezoneText,
              };
              const schedulesUpdateRequest = {
                id: content.id,
                data: scheduleForTwitterPost,
              };
              console.log(schedulesUpdateRequest);

              scheduleApiClient.schedulesUpdate(schedulesUpdateRequest).then((r) => {
                console.log('Updated schedule');
                console.log(r);

                const msg_class = 'text-green-500';
                const message = `Updated the schedule successfully`;
                setScheduleMessage(message);
                setScheduleMessageClass(msg_class);
                setSchedule(scheduleDate);
              }).catch((e) => {
                console.log(e);

                const msg_class = 'text-red-500';
                const message = `Failed to update the schedule`;
                setScheduleMessage(message);
                setScheduleMessageClass(msg_class);
              }).finally(() => {
                if (deleteNumber !== undefined) {
                  updateNumber.current = updateNumber.current + 1;
                  setDeleteNumber && setDeleteNumber(updateNumber.current);
                  // console.log('update deleteNumber');
                }
              });
            } else {
              const scheduleMessage = 'Wrong date format';
              const msg_class = 'text-red-500';
              setScheduleMessage(scheduleMessage);
              setScheduleMessageClass(msg_class);
            }
          } else {
            console.log('Timezone, date or time is blank');
          }
        } else {  // create new schedule
          console.log(`Create schedule for content: ${content.id}`);
          // scheduleApiClient.schedulesCreate().then().catch().finally();
          if (timezoneText && dateText && timeText) {
            console.log(`Update schedule for content: ${content.id}`);

            const dateFormat = `${dateText}T${timeText}`;
            console.log(`dateFormat: ${dateFormat}`);
            const userDate = DateTime.fromISO(dateFormat, {zone: timezoneText});
            // const userDate = DateTime.fromISO(dateFormat, {zone: profile.timezoneText});
            const userDateStr = userDate.toISO();
            const userLocalDateStr = userDate.toLocal().toISO();
            console.log(`userDateStr: ${userDateStr}, userLocalDateStr: ${userLocalDateStr}`);

            if (userDateStr && userLocalDateStr) {
              const scheduleDate = new Date(userDateStr);
              // const userScheduleTime = new Date(userLocalDateStr);
              const userScheduleTime = new Date(dateFormat);

              const scheduleForTwitterPost = {
                content: content.id,
                // schedule: userDate,
                // userScheduleTime: userDate,
                schedule: scheduleDate,
                userScheduleTime: dateFormat,
                timezone: profile.timezone,
                // timezoneText: timezoneText,
              };
              const schedulesCreateRequest = {
                data: scheduleForTwitterPost,
              };
              console.log(schedulesCreateRequest);

              scheduleApiClient.schedulesCreate(schedulesCreateRequest).then((r) => {
                console.log('Created schedule');
                console.log(r);

                const msg_class = 'text-green-500';
                const message = `Created the schedule successfully`;
                setScheduleMessage(message);
                setScheduleMessageClass(msg_class);
                setSchedule(scheduleDate);
              }).catch((e) => {
                console.log(e);

                const msg_class = 'text-red-500';
                const message = `Failed to create the schedule`;
                setScheduleMessage(message);
                setScheduleMessageClass(msg_class);
              }).finally(() => {
                if (deleteNumber !== undefined) {
                  updateNumber.current = updateNumber.current + 1;
                  setDeleteNumber && setDeleteNumber(updateNumber.current);
                  // console.log('update deleteNumber');
                }
              });
            } else {
              const scheduleMessage = 'Wrong date format';
              const msg_class = 'text-red-500';
              setScheduleMessage(scheduleMessage);
              setScheduleMessageClass(msg_class);
            }
          } else {
            console.log('Timezone, date or time is blank');
          }
        }
      } else {  // add new content
        console.log('Create new draft');

        const contentText = textRef.current?.value;
        const timezoneText = profile.timezoneText;
        const dateText = dateRef.current?.value;
        const timeText = timeRef.current?.value;

        console.log(`timezone value: ${timezoneText}`);
        console.log(`date value: ${dateText}`);
        console.log(`time value: ${timeText}`);
        console.log(`text value: ${contentText}`);

        if (contentText && contentText.trim()) {  // there is content
          const contentForTwitterPost = {
            text: contentText,
          }
          const contentsCreateRequest = {
            data: contentForTwitterPost,
          }

          contentApiClient.contentsCreate(contentsCreateRequest).then((new_content: any) => {
            console.log(new_content);

            const msg_class = 'text-green-500';
            const message = `Created the draft successfully. You can see it on the tab ${noTopicString} or ${allTopicString}. Or continue to create new draft.`;
            setMessage(message);
            setMessageClass(msg_class);
            setLocalContent(new_content);

            console.log(`isGenerateImage: ${isGenerateImage.current}`);
            if (isGenerateImage.current) {
              try {
                console.log('Generate image for new content');
                if (contentText && contentText.trim()) {  // there is content
                  if (new_content) {
                    setImageStatus(PostStatus.GENERATING);
                    imageApiClient.imagesCreateImage({id: new_content?.id}).then((imageContent) => {
                      console.log(imageContent);
                      setImage(imageContent.imageUrl);

                      const msg_class = 'text-green-500';
                      const message = `Created the image for the draft`;
                      setMessage(message);
                      setMessageClass(msg_class);

                      if (deleteNumber !== undefined) {
                        updateNumber.current = updateNumber.current + 1;
                        setDeleteNumber && setDeleteNumber(updateNumber.current);
                        // console.log('update deleteNumber');
                      }
                    }).catch((e) => {
                      console.log(e);

                      const msg_class = 'text-red-500';
                      const message = `Failed to create the image for the draft`;
                      setMessage(message);
                      setMessageClass(msg_class);
                    }).finally(() => {
                        setImageStatus(PostStatus.GENERATED);
                    });

                    // setTimeout(() => {
                    //     setImageStatus(PostStatus.GENERATED);
                    // }, 4000);
                  }
                } else {
                  console.log('No content');

                  const msg_class = 'text-red-500';
                  const message = 'No any content, please input some';
                  setMessage(message);
                  setMessageClass(msg_class);
                }
              } catch (e) {
                  console.log(e);

                  const msg_class = 'text-red-500';
                  const message = `Failed to create the image for the draft`;
                  setMessage(message);
                  setMessageClass(msg_class);
              } finally {
                isGenerateImage.current = false;
                // console.log(`isGenerateImage after: ${isGenerateImage.current}`);
              }
            }

            createOrUpdateSchedule(timezoneText, dateText, timeText, new_content);
          }).catch((r) => {
            console.log(r);

            const msg_class = 'text-red-500';
            const message = `Failed to create the draft`;
            setMessage(message);
            setMessageClass(msg_class);
          }).finally(() => {
            if (deleteNumber !== undefined) {
              updateNumber.current = updateNumber.current + 1;
              setDeleteNumber && setDeleteNumber(updateNumber.current);
              // console.log('update deleteNumber');
            }
          });

        } else {  // no content
          console.log('No content');

          const msg_class = 'text-red-500';
          const message = 'No any content, please input some';
          setMessage(message);
          setMessageClass(msg_class);
        }
      }
    }

    return (
        <>
            {
              hasParent ? 
                <div className="py-2 w-full md:col-span-2 lg:col-span-1 min-w-max flex justify-end">
                    {
                        variant === "add" ?
                            <PrimaryBtn onClick={openModal} className={ className || "h-11 px-5 w-full" }>
                              { newWords ||  'Add New' }
                            </PrimaryBtn>
                            : hasWord ?
                              <SecondaryBtn onClick={openModal} className={ className || "px-2 xs:px-4" }>
                                <FontAwesomeIcon icon={faEdit} />
                                { newWords ||  'Edit' }
                              </SecondaryBtn>
                              :
                              <SecondaryBtn onClick={openModal} className={ className || "p-3" }>
                                <FontAwesomeIcon icon={faEdit} />
                              </SecondaryBtn>
                    }

                </div>
              : 
                  variant === "add" ?
                      <PrimaryBtn onClick={openModal} className={ className || "h-11 px-5 w-full" }>
                        { newWords ||  'Add New' }
                      </PrimaryBtn>
                      : hasWord ?
                        <SecondaryBtn onClick={openModal} className={ className || "px-2 xs:px-4" }>
                          <FontAwesomeIcon icon={faEdit} />
                          { newWords ||  'Edit' }
                        </SecondaryBtn>
                        :
                        <SecondaryBtn onClick={openModal} className={ className || "p-3" }>
                          <FontAwesomeIcon icon={faEdit} />
                        </SecondaryBtn>
            }
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={cn(
                                    "w-full max-w-3xl transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    {/* Header  */}
                                    <div className="w-full flex flex-row py-5 px-4 md:px-5 items-center justify-between pb-3">
                                        <h3 className="text-white text-2xl md:text-3xl font-bold font-jakarta">
                                            {variant === "add" ? "Add New Draft" : "Edit Draft"}
                                        </h3>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="px-4 md:px-8 py-16 max-h-[calc(100vh_-_200px)] overflow-y-auto ">
                                        <div className="h-full flex flex-col justify-between gap-5">
                                            <div>
                                                <InputElWChips
                                                    placeholder="Add your social media handle"
                                                    labelNode={
                                                        <label className="w-full flex items-center justify-between">
                                                            <p className="text-white text-sm font-bold">
                                                                <FontAwesomeIcon icon={faSquareArrowUpRight} />
                                                                <span className="ms-3">Post To</span>
                                                            </p>
                                                        </label>
                                                    } />
                                            </div>
                                            <div className="w-full grid grid-cols-2 gap-x-2">
                                                <div className="col-span-full">
                                                    <SelectEl
                                                        className="w-full"
                                                        labelNode={
                                                            <label className="w-full flex items-center justify-between text-start flex-wrap gap-1 mb-2">
                                                                <p className="text-white font-bold text-sm w-full md:w-auto">
                                                                    <FontAwesomeIcon icon={faClock} />
                                                                    <span className="ms-3">Date and Time (optional)</span>
                                                                </p>
                                                                <p className="text-sm font-normal text-white/70 font-jakarta ps-6 w-full md:w-auto">
                                                                    You can schedule it later
                                                                </p>
                                                            </label>
                                                        }
                                                        options={
                                                        //   timezone ? timezone === profile.timezoneText ? [
                                                        //       {
                                                        //           text: profile.timezoneText,
                                                        //           value: profile.timezone,
                                                        //           disabled: true
                                                        //       }
                                                        //     ] : [
                                                        //       {
                                                        //           text: timezone,
                                                        //           value: timezone,
                                                        //           disabled: true
                                                        //       },
                                                        //       {
                                                        //           text: profile.timezoneText,
                                                        //           value: profile.timezone,
                                                        //           disabled: true
                                                        //       }
                                                        //   ]
                                                        //
                                                        //
                                                        //   :
                                                        //
                                                        //   [
                                                        //     {
                                                        //         // text: "Asia/Shanghai",
                                                        //         // value: "asia/shaghai",
                                                        //         // disabled: true
                                                        //         text: profile.timezoneText,
                                                        //         value: profile.timezone,
                                                        //         disabled: true
                                                        //     },
                                                        // ]

                                                          [
                                                            {
                                                                // text: "Asia/Shanghai",
                                                                // value: "asia/shaghai",
                                                                // disabled: true
                                                                text: profile.timezoneText,
                                                                value: profile.timezone,
                                                                disabled: true
                                                            },
                                                        ]
                                                    } 
                                                  />
                                                </div>
                                                {/* <InputElDate className="w-full col-span-1" /> */}
                                                {
                                                  schedule ? <>
                                                    {/*<InputEl type="date" className="w-full col-span-1" value={schedule.toLocaleDateString()} />*/}
                                                    <InputEl type="date" className="w-full col-span-1"
                                                      // value={new Date(schedule.getTime() - schedule.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]}
                                                      value={DateTime.fromISO(schedule.toISOString()).setZone(profile.timezoneText).toFormat('yyyy-MM-dd')}
                                                      ref={dateRef}
                                                    />
                                                    <InputEl type="time" className="w-full col-span-1"
                                                      // value={schedule.toTimeString().split(' ')[0]}
                                                      value={DateTime.fromISO(schedule.toISOString()).setZone(profile.timezoneText).toFormat('HH:mm:ss')}
                                                      ref={timeRef}
                                                    />
                                                  </>
                                                  :
                                                  <>
                                                    <InputEl type="date" className="w-full col-span-1" ref={dateRef} />
                                                    <InputEl type="time" className="w-full col-span-1" ref={timeRef} />
                                                  </>
                                                }
                                            </div>
                                            <TextAreaEl
                                                id="content-text"
                                                labelNode={
                                                    <label className="w-full flex items-center justify-between">
                                                        <p className="text-white text-sm font-bold">
                                                            <FontAwesomeIcon icon={faT} />
                                                            <span className="ms-3">Text</span>
                                                            <span className="text-white text-start font-light text-sm ms-3">(Please input at most 280 characters)</span>
                                                        </p>
                                                    </label>
                                                }
                                                value={localContent?.text || content?.text}
                                                ref={textRef}
                                            />
                                            <div className="flex items-center gap-3 md:gap-5 flex-wrap md:flex-nowrap">
                                                <div className="w-full md:w-2/3 lg:w-1/2">
                                                    {
                                                      image ?
                                                        <ImageEl
                                                            showLoading={imageStatus === PostStatus.GENERATING}
                                                            src={image} alt="" width={367} height={290}
                                                            className="w-full h-[260px] sm:h-80 md:h-[290px] rounded-20 overflow-hidden" />
                                                        :
                                                        <ImageEl
                                                            showLoading={imageStatus === PostStatus.GENERATING}
                                                            src="" alt="No Image" width={367} height={290}
                                                            className="w-full h-[260px] sm:h-80 md:h-[290px] rounded-20 overflow-hidden text-white" />
                                                    }
                                                </div>
                                                <div className="flex items-center justify-start">
                                                    <SecondaryBtn onClick={onRegenerateClicked} filled={false} className="border-white/10 py-3 px-5">
                                                      { image ? 'Regenerate Image' : 'Generate Image' }
                                                    </SecondaryBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Footer  */}
                                    <GrBorderBox className="p-px md:p-[2px] w-full">
                                        <div className="w-full min-h-[20px] bg-gr-purple-dark p-4 md:p-5 flex items-center gap-3 justify-end">
                                            <p id="message" className={messageClass ? "grow text-start font-light text-sm" + ' ' + messageClass : "grow text-start font-light text-sm"}>{message}</p>
                                            <p id="message1" className={scheduleMessageClass ? "grow text-start font-light text-sm" + ' ' + scheduleMessageClass : "grow text-start font-light text-sm"}>
                                              {scheduleMessage}
                                            </p>
                                            <SecondaryBtn onClick={closeModal} filled={false} className="border-white/10 py-3 px-8 w-full md:w-auto">
                                                Cancel
                                            </SecondaryBtn>
                                            <PrimaryBtn className="py-3 h-full px-8 w-full md:w-auto" onClick={onSubmit}>
                                                {variant === "add" ? "Add" : "Save"}
                                            </PrimaryBtn>
                                        </div>
                                    </GrBorderBox>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}




// export default function AddDraftPopup() {
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button>Hell</Button>
//             </DialogTrigger>
//             <DialogContent className={cn(
//                 "w-full max-w-xl md:max-h-[90vh] h-full transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all p-0 border-none",
//                 "relative"
//             )}>
//                 <DialogHeader className="p-5 text-white">
//                     <DialogTitle>
//                         Add New Draft
//                     </DialogTitle>
//                 </DialogHeader>
//                 <div className="p-8 py-16 max-h-full overflow-y-auto">
//                     <div className="h-full flex flex-col justify-between gap-6">
//                         <div className="">
//                             {/* {heading} */}
//                             <div className="flex items-center gap-3">
//                                 <SmallSchedulePostEl text="@moonlanding.media" icon={faTwitter} />
//                                 <SmallSchedulePostEl text="@moonlanding.media" icon={faFacebook} />
//                             </div>
//                             <p className="mt-4 font-light text-sm text-th-gray font-jakarta">
//                                 Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat.
//                             </p>
//                             <img src="/images/today-post.png" loading="lazy"
//                                 className="mt-6 rounded-20 overflow-hidden object-cover object-center aspect-video w-full lg:h-[490px]" />

//                         </div>
//                         {/* Buttons  */}
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <SecondaryBtn className="px-2 xs:px-4">
//                                     <FontAwesomeIcon icon={faEdit} />
//                                     Edit
//                                 </SecondaryBtn>
//                                 <SecondaryBtn className="px-2 xs:px-4">
//                                     <FontAwesomeIcon icon={faTrash} />
//                                     Delete
//                                 </SecondaryBtn>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <SecondaryBtn filled={false} className="border-white/10 py-3">
//                                     Regenerate Image
//                                 </SecondaryBtn>
//                                 <PrimaryBtn className="py-3 h-full">
//                                     Send Now
//                                 </PrimaryBtn>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 <DialogFooter>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

