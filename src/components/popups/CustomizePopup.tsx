import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { InputElWChips } from "../ui/input"
import { faPen,  faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavigationItem } from "../sidebar"
import SelectEl from "../ui/selectel"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import CustomTooltip from "../custom-tooltip"







export default function CustomizePopup() {
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
                className="my-0.5"
                text="Customize"
                icon={<FontAwesomeIcon icon={faPen} />} />

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

                                    <div className="max-h-[calc(100vh_-_200px)] overflow-y-auto flex flex-col space-y-32">
                                        {/* content */}
                                        <div className="px-7 md:space-y-7 space-y-3">
                                            <div className="font-jakarta text-white text-[32px] font-bold">
                                                Customize
                                            </div>
                                            <SelectEl
                                                className="w-full"
                                                labelNode={
                                                    <label className="w-full flex items-center justify-between text-start flex-wrap gap-1 mb-2">
                                                        <p className="text-white font-bold text-sm">
                                                            Industry
                                                        </p>
                                                    </label>
                                                }
                                                options={[
                                                    {
                                                        text: "Marketing",
                                                        value: "",
                                                        disabled: false
                                                    },
                                                ]} />
                                            <InputElWChips
                                                placeholder="Add keyword"
                                                labelNode={
                                                    <label className="w-full flex items-center justify-between">
                                                        <p className="text-white text-sm font-bold font-jakarta">
                                                            Keywords
                                                        </p>
                                                    </label>
                                                } />
                                            <div className="flex space-x-3">
                                                <div className="flex items-center space-x-2">
                                                    <Switch id="airplane-mode" />
                                                    <Label htmlFor="airplane-mode"></Label>
                                                </div>
                                                <p className="text-sm font-normal font-jakarta text-white">
                                                    Skip topics about 3rd party brands - <span className="text-white/70">Yes</span>
                                                </p>
                                            </div>
                                            <div>
                                                <CustomTooltip
                                                    title="Increase Article Volume"
                                                    content={
                                                        <>
                                                            To increase articles volume, please email hello@zian.ai
                                                        </>
                                                    } />
                                            </div>
                                            <div className="flex justify-between pt-8 md:mt-28">
                                                <div></div>
                                                <div className="space-x-[10px] py-5">
                                                    <SecondaryBtn className="text-sm py-3">
                                                        Cancel
                                                    </SecondaryBtn>
                                                    <PrimaryBtn className=" h-full w-auto px-12 py-3">
                                                        Save
                                                    </PrimaryBtn>

                                                </div>
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


