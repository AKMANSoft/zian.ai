import { Fragment, useState } from "react"
import { PrimaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { faCreditCard, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavigationItem } from "../sidebar"
import useAuthUserStore from "@/lib/zustand/authUserStore"







export default function BillingPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const { authUser } = useAuthUserStore()


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }




    return (
        <>


            <NavigationItem
                onClick={openModal} active={isOpen}
                className="mb-3"
                text="Billing & Plan"
                icon={<FontAwesomeIcon icon={faCreditCard} />} />

            <Transition appear show={isOpen} static as={Fragment}>
                <Dialog as="div" onClose={() => setIsOpen(true)} static className="relative z-50">
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
                                    "w-full max-w-[805px] transform overflow-hidden rounded-20  shadow-xl transition-all",
                                    "relative  border-primary rounded-20"
                                )}>

                                    <div className="  h-full flex flex-col space-y-32 p-7 pb-0 bg-gr-purple-dark md:pb-7">
                                        {/* content */}

                                        <div className=" space-y-6 lg:space-y-10 ">
                                            <div>
                                                <div className="w-full  flex flex-row  items-center justify-between ">
                                                    <div>
                                                        <h1 className="text-2xl md:text-[32px] font-jakarta font-bold text-white">
                                                            Billing & Plan
                                                        </h1>
                                                    </div>
                                                    <button type="button" onClick={closeModal}
                                                        className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-point">
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="space-y-[6px]">
                                                        <h1 className="text-white font-jakarta text-base md:text-xl font-bold">
                                                            {authUser?.profile?.package} Plan:{authUser?.profile?.quota}  Articles per week
                                                        </h1>
                                                        <p className="md:text-base text-sm font-normal font-jakarta text-white/70">
                                                            Current quota remaining: {Math.max(0, (authUser?.profile?.quota ?? 0) - 1)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-white w-full h-1">
                                                    <div className="bg-primary w-[90%] h-full">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center flex-col md:flex-row gap-5 md:pb-0 pb-12">
                                                <div className="w-full p-[10px] flex items-center justify-center border border-body/10 rounded-10 bg-body/10 md:w-auto md:p-[14px]">
                                                    <p className="text-white text-sm font-medium font-Inter">
                                                        To change or upgrade your plan, please email
                                                        <a href="mailto:hello@zian.ai" className="underline pl-1">
                                                            hello@zian.ai
                                                        </a>
                                                    </p>
                                                </div>
                                                <PrimaryBtn type="submit" className=" h-12 py-3 w-full md:w-auto md:px-[30px]">
                                                    Upgrade
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


