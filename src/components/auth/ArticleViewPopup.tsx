import { Fragment, ReactNode, useState } from "react"
import { SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function ArticleViewPopup({ trigger }: Props) {
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
                        Article View Popup
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
                                        <div>
                                            <h1 className="text-2xl font-bold font-jakarta">
                                                Minneapolis Digital Summit 2023: A Must-Attend for Modern Marketers
                                            </h1>
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


