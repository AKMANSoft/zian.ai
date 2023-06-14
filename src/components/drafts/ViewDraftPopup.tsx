import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faEye, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from "@headlessui/react"
import { SmallSchedulePostEl } from "../postview-section"
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { cn } from "@/lib/utils"




export default function ViewDraftPopup() {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <SecondaryBtn onClick={openModal} className="p-3">
                <FontAwesomeIcon icon={faEye} />
            </SecondaryBtn>

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
                                                    <SmallSchedulePostEl text="@moonlanding.media" icon={faTwitter} />
                                                    <SmallSchedulePostEl text="@moonlanding.media" icon={faFacebook} />
                                                </div>
                                                <p className="mt-4 font-light text-sm text-th-gray font-jakarta">
                                                    Lorem ipsum dolor sit amet, consect etur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia m, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consquat.
                                                </p>
                                                <img src="/images/today-post.png" loading="lazy"
                                                    className="mt-6 rounded-20 overflow-hidden object-cover object-center aspect-video w-full lg:h-[490px]" />

                                            </div>
                                            {/* Buttons  */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <SecondaryBtn className="px-2 xs:px-4">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        Edit
                                                    </SecondaryBtn>
                                                    <SecondaryBtn className="px-2 xs:px-4">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                        Delete
                                                    </SecondaryBtn>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <SecondaryBtn filled={false} className="border-white/10 py-3">
                                                        Regenerate Image
                                                    </SecondaryBtn>
                                                    <PrimaryBtn className="py-3 h-full">
                                                        Send Now
                                                    </PrimaryBtn>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full min-h-[20px]">

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


