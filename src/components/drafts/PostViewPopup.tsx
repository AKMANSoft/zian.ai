import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faEye, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from "@headlessui/react"
import { SmallSchedulePostEl } from "../postview-section"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { cn } from "@/lib/utils"
import { PostStatus } from "@/pages/GenerateContent"
import ImageEl from "../ImageEl"
import { TriggerFunProps } from "../WarningPopup"
import WarningPopup from "@/components/WarningPopup";
import { changeImageUrl } from '@/lib/utils'
import AddEditDraftPopup from "@/components/drafts/AddEditDraftPopup";

import {
  contentApiClient,
} from '@/api.env'




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
    content?: any
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
}


export default function PostViewPopup({ trigger, content, deleteNumber, setDeleteNumber }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageStatus, setImageStatus] = useState<PostStatus>(PostStatus.GENERATED);

    const onRegenerateClicked = () => {
        setImageStatus(PostStatus.GENERATING);
        setTimeout(() => {
            setImageStatus(PostStatus.GENERATED);
        }, 4000);
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function onDeleteContent(): void {
      if (content) {
        console.log(`Delete content: ${content.id}`);
        contentApiClient.contentsDelete({id: content.id}).then((r) => {
          // console.log(r);
            // window.location.reload();
          if (setDeleteNumber && deleteNumber != undefined) {
            closeModal(); // close this popup
            setDeleteNumber(deleteNumber + 1);
          }
        });
      }
    }

    return (
        <>
            {
                trigger ?
                    trigger?.({
                        open: openModal,
                        close: closeModal
                    })
                    :
                    <SecondaryBtn onClick={openModal} className="p-3">
                        <FontAwesomeIcon icon={faEye} />
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
                                    <div className="w-full flex flex-row p-5 items-center justify-between pb-3">
                                        <div></div>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="p-8 py-16 max-h-[calc(100vh_-_200px)] overflow-y-auto">
                                        <div className="h-full flex flex-col justify-between gap-6">
                                            <div className="">
                                                {/* {heading} */}
                                                <div className="flex items-center gap-3">
                                                  <SmallSchedulePostEl text={content?.twitterUsername || ""} hasPost={false} icon={faTwitter} />
                                                </div>
                                                <p className="mt-4 font-light text-sm text-th-gray font-jakarta">
                                                  { content?.text || "Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat." }
                                                </p>
                                                {
                                                  content?.image &&
                                                    <ImageEl
                                                        showLoading={imageStatus === PostStatus.GENERATING}
                                                        src={content?.image || changeImageUrl("/images/today-post.png")} loading="lazy"
                                                        className="mt-6 rounded-20 overflow-hidden object-cover object-center aspect-video w-full lg:h-[490px]" />
                                                }
                                            </div>
                                            {/* Buttons  */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {/*
                                                    <SecondaryBtn className="px-2 xs:px-4">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        Edit
                                                    </SecondaryBtn>
                                                      */}
                                                    <AddEditDraftPopup variant="edit" content={content} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} hasWord={true}/>

                                                    {/*
                                                    <SecondaryBtn className="px-2 xs:px-4">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                        Delete
                                                    </SecondaryBtn>
                                                      */}

                                                    <WarningPopup
                                                        heading="Are you sure you want to delete this post?"
                                                        description={content?.text}
                                                        negativeText="Cancel"
                                                        positiveText="Yes, Delete"
                                                        trigger={({ open }) => (
                                                            <SecondaryBtn onClick={open} className="px-2 xs:px-4">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                                Delete
                                                            </SecondaryBtn>
                                                        )}
                                                       onClickPositiveTextButton={onDeleteContent}
                                                    />
                                                </div>
                                                <div className="hidden md:flex items-center gap-4">
                                                    <SecondaryBtn onClick={onRegenerateClicked} filled={false} className="border-white/10 py-3">
                                                      {content?.image ? 'Regenerate Image' : 'Generate Image'}
                                                    </SecondaryBtn>
                                                    <PrimaryBtn className="py-3 h-full">
                                                        Send Now
                                                    </PrimaryBtn>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full min-h-[20px] bg-gr-purple-dark p-4 md:p-5 flex md:hidden items-center gap-3 justify-end">
                                        <SecondaryBtn onClick={onRegenerateClicked} filled={false} className="border-white/10 py-3 px-8 w-full md:w-auto">
                                            Regenerate Image
                                        </SecondaryBtn>
                                        <PrimaryBtn className="py-3 h-full px-8 w-full md:w-auto">
                                            Send Now
                                        </PrimaryBtn>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


