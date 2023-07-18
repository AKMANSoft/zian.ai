import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { InputEl } from "../ui/input"
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavigationItem } from "../sidebar"







export default function EditProfilePopup() {
    const [isOpen, setIsOpen] = useState(false);

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
                        className="my-0.5" text="Edit Profile"
                        icon={<FontAwesomeIcon icon={faUser} />} />
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

                                    <div className="pb-4 max-h-[calc(100vh_-_200px)] overflow-y-auto flex flex-col space-y-6">
                                        {/* content */}
                                        <div className="mx-7 md:space-y-7 space-y-3">
                                            <div className="font-jakarta text-white text-[32px] font-bold ">
                                                Edit Profile
                                            </div>
                                            <div className="space-y-4  md:text-sm text-xs">
                                                <InputEl label="Name" placeholder="Mike Males" />
                                                <InputEl label="Email" placeholder="mike@gmail.com" />
                                                <InputEl label="Phone" placeholder="+61 00 000 00" />
                                                <InputEl label="Website" placeholder="https://www.website.com" />
                                                <SecondaryBtn className="border-white/10 py-4 md:text-sm">
                                                    Update Password
                                                </SecondaryBtn>
                                            </div>
                                        </div>

                                        <div className="flex justify-between md:px-[30px] px-7">
                                            <div></div>
                                            <div className="space-x-[10px]">
                                                <SecondaryBtn className="border-white/10 py-4 px-6 md:px-10 md:text-sm">
                                                    Cancel
                                                </SecondaryBtn>
                                                <PrimaryBtn className=" h-full w-auto py-3 md:px-12 px-6">
                                                    Save
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


