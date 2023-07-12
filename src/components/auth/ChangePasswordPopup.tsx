import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
// import { SmallSchedulePostEl } from "../postview-section"
// import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { cn } from "@/lib/utils"
// import { PostStatus } from "@/pages/GenerateContent"
// import ImageEl from "../ImageEl"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function ChangePasswordPopup({ trigger }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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
                        Change password
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
                        <div className="flex min-h-full items-center justify-center p-4">
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
                                    "w-full max-w-[805px] transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="w-full flex flex-row  items-center justify-between px-5 mt-5">
                                        <div></div>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="pb-[50px] max-h-[calc(100vh_-_200px)] overflow-y-auto flex flex-col">
                                        {/* content */}
                                        <div className="mx-7 md:space-y-7 space-y-3">
                                            <div className="font-jakarta text-white text-[32px] font-bold">
                                                Update Password
                                            </div>
                                            <div className="space-y-4  md:text-sm text-xs">
                                                <InputEl label="Enter your current password" placeholder="" />
                                                <InputEl label="Enter new password" placeholder="" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between md:mx-11 mx-8 md:mt-[308px] mt-24">
                                            <div></div>
                                            <div className="space-x-[10px]">
                                                <SecondaryBtn className="py-4 text-sm">
                                                    Cancel
                                                </SecondaryBtn>
                                                <PrimaryBtn className=" h-full w-auto px-6 py-3">
                                                    Update Password
                                                </PrimaryBtn>
                                            </div>
                                        </div>

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

