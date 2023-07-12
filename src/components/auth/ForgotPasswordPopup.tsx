import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from "@headlessui/react"
// import { SmallSchedulePostEl } from "../postview-section"
// import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { cn } from "@/lib/utils"
// import { PostStatus } from "@/pages/GenerateContent"
// import ImageEl from "../ImageEl"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function ForgotPassword({ trigger }: Props) {
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
                        ForgotPassword
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
                                    "w-full max-w-[500px] transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="w-full flex flex-row  items-center justify-between px-5 mt-5">
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </button>
                                        <div></div>

                                    </div>

                                    <div className="md:px-8 px-5 pb-[50px] max-h-[calc(100vh_-_200px)] overflow-y-auto">
                                        {/* content */}
                                        <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                            className={cn(
                                                "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                "block"
                                            )}
                                            alt="" />
                                        <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                            Forgot Password?
                                        </div>
                                        <div>
                                            <p className="md:text-sm text-xs font-normal font-jakarta text-white/70 text-center mt-4">
                                                We got this. Please enter your registered email below and we will send instructions to reset your password
                                            </p>
                                        </div>
                                        <div className="lg:p-5 lg:pt-8 space-y-4 md:text-sm text-xs pt-4 lg:px-0 px-1">
                                            <InputEl label="Email" placeholder="" />
                                        </div>
                                        <div className="flex justify-between mx-5 lg:pt-0 pt-5">
                                            <div></div>
                                            <div>
                                                <PrimaryBtn className=" h-full w-full md:w-auto px-8 py-3">
                                                    Submit
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


