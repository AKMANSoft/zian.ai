import { Fragment, ReactNode, useState } from "react"
import { PrimaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { TriggerFunProps } from "../WarningPopup"
import { InputEl } from "../ui/input"




type Props = {
    trigger?: ({ close, open }: TriggerFunProps) => ReactNode
}


export default function SignupPopup({ trigger }: Props) {
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
                    <p className="font-jakarta text-sm font-bold text-primary underline cursor-pointer" onClick={openModal}>
                        Sign up here
                    </p>
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
                        <div className="flex min-h-full items-center justify-center ">
                           
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
                                    "md:w-full  max-w-[500px] transform overflow-hidden rounded-20 bg-gr-purple-dark shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <div className="px-8 py-[30px]  max-h-[calc(100vh_-_200px)] overflow-y-auto">
                                        {/* content */}
                                        <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                            className={cn(
                                                "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                "block"
                                            )}
                                            alt="" />
                                        <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                            Sign up
                                        </div>
                                        <div className="lg:p-5 lg:pt-8 space-y-[10px] md:text-sm text-xs">
                                            <InputEl label="Name" placeholder="" />
                                            <InputEl label="Email" placeholder="" />
                                            <InputEl label="Phone" placeholder="" />
                                            <InputEl label="Password" placeholder="" />
                                        </div>
                                        <div className="flex justify-between mb-[30px] mt-5 md:mx-5">
                                            <div className="">
                                                <p className="font-jakarta md:text-sm text-xs font-bold text-white">
                                                    Already have an account?
                                                </p>
                                                <a href="" className="font-jakarta md:text-sm text-xs font-bold text-primary underline">
                                                    Login here
                                                </a>
                                            </div>
                                            <div>
                                                <PrimaryBtn className="py-3 h-full px-8  md:w-auto ">
                                                    Sign up
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


