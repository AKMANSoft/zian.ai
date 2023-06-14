import { faClock, faSquareArrowUpRight, faT, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { cn } from "@/lib/utils"
import GrBorderBox from "../ui/gr-border-box"
import { InputEl, InputElWChips } from "../ui/input"
import { SelectElNew } from "../ui/selectel"
import { TextAreaEl } from "../ui/textarea"







export default function AddDraftPopup() {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="py-2 w-full md:col-span-2 lg:col-span-1 min-w-max flex justify-end">
                <PrimaryBtn onClick={openModal} className="h-11 px-5 w-full">
                    Add New
                </PrimaryBtn>
            </div>
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
                                    <div className="w-full flex flex-row p-5 items-center justify-between pb-3">
                                        <h3 className="text-white text-3xl font-bold font-jakarta">
                                            Add New Draft
                                        </h3>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="p-8 py-16 max-h-[calc(100vh_-_200px)] overflow-y-auto ">
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
                                                <SelectElNew
                                                    className="col-span-full w-full"
                                                    labelNode={
                                                        <label className="w-full flex items-center justify-between mb-2">
                                                            <p className="text-white font-bold text-sm">
                                                                <FontAwesomeIcon icon={faClock} />
                                                                <span className="ms-3">Date and Time (optional)</span>
                                                            </p>
                                                            <p className="text-sm font-normal text-white/70 font-jakarta">
                                                                You can schedule it later
                                                            </p>
                                                        </label>
                                                    }
                                                    options={[
                                                        {
                                                            text: "Asia/Shanghai",
                                                            value: "asia/shaghai",
                                                            disabled: false
                                                        },
                                                        {
                                                            text: "Asia/Shanghai",
                                                            value: "asia/shaghai",
                                                            disabled: false
                                                        },
                                                        {
                                                            text: "Asia/Shanghai",
                                                            value: "asia/shaghai",
                                                            disabled: false
                                                        },
                                                        {
                                                            text: "Asia/Shanghai",
                                                            value: "asia/shaghai",
                                                            disabled: false
                                                        },
                                                    ]} />
                                                {/* <InputElDate className="w-full col-span-1" /> */}
                                                <InputEl type="date" className="w-full col-span-1" />
                                                <InputEl type="time" className="w-full col-span-1" />
                                            </div>
                                            <TextAreaEl
                                                labelNode={
                                                    <label className="w-full flex items-center justify-between">
                                                        <p className="text-white text-sm font-bold">
                                                            <FontAwesomeIcon icon={faT} />
                                                            <span className="ms-3">Text</span>
                                                        </p>
                                                    </label>
                                                }
                                                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                                        </div>
                                    </div>
                                    {/* Footer  */}
                                    <GrBorderBox className="p-[2px] w-full">
                                        <div className="w-full min-h-[20px] bg-gr-purple-dark p-5 flex items-center gap-3 justify-end">
                                            <SecondaryBtn filled={false} className="border-white/10 py-3 px-8">
                                                Cancel
                                            </SecondaryBtn>
                                            <PrimaryBtn className="py-3 h-full">
                                                Send Now
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

