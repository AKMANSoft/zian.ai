import { faClock, faEdit, faSquareArrowUpRight, faT, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { PrimaryBtn, SecondaryBtn } from "../ui/buttons"
import { cn } from "@/lib/utils"
import GrBorderBox from "../ui/gr-border-box"
import { InputEl, InputElWChips } from "../ui/input"
import SelectEl from "../ui/selectel"
import { TextAreaEl } from "../ui/textarea"
import { PostStatus } from "@/pages/GenerateContent"
import ImageEl from "../ImageEl"
import { changeImageUrl } from '@/lib/utils'





type Props = {
    variant: "edit" | "add"
}

export default function AddEditDraftPopup({ variant = "add" }: Props) {
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

    return (
        <>
            <div className="py-2 w-full md:col-span-2 lg:col-span-1 min-w-max flex justify-end">
                {
                    variant === "add" ?
                        <PrimaryBtn onClick={openModal} className="h-11 px-5 w-full">
                            Add New
                        </PrimaryBtn>
                        :
                        <SecondaryBtn onClick={openModal} className="p-3">
                            <FontAwesomeIcon icon={faEdit} />
                        </SecondaryBtn>
                }

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
                                    <div className="w-full flex flex-row py-5 px-4 md:px-5 items-center justify-between pb-3">
                                        <h3 className="text-white text-2xl md:text-3xl font-bold font-jakarta">
                                            {variant === "add" ? "Add New Draft" : "Edit Draft"}
                                        </h3>
                                        <button type="button" onClick={closeModal}
                                            className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className="px-4 md:px-8 py-16 max-h-[calc(100vh_-_200px)] overflow-y-auto ">
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
                                                <div className="col-span-full">
                                                    <SelectEl
                                                        className="w-full"
                                                        labelNode={
                                                            <label className="w-full flex items-center justify-between text-start flex-wrap gap-1 mb-2">
                                                                <p className="text-white font-bold text-sm w-full md:w-auto">
                                                                    <FontAwesomeIcon icon={faClock} />
                                                                    <span className="ms-3">Date and Time (optional)</span>
                                                                </p>
                                                                <p className="text-sm font-normal text-white/70 font-jakarta ps-6 w-full md:w-auto">
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
                                                        ]} />
                                                </div>
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
                                                value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                                            <div className="flex items-center gap-3 md:gap-5 flex-wrap md:flex-nowrap">
                                                <div className="w-full md:w-2/3 lg:w-1/2">
                                                    <ImageEl
                                                        showLoading={imageStatus === PostStatus.GENERATING}
                                                        src={changeImageUrl("/images/today-post.png")} alt="" width={367} height={290}
                                                        className="w-full h-[260px] sm:h-80 md:h-[290px] rounded-20 overflow-hidden" />
                                                </div>
                                                <div className="flex items-center justify-start">
                                                    <SecondaryBtn onClick={onRegenerateClicked} filled={false} className="border-white/10 py-3 px-5">
                                                        Regenerate Image
                                                    </SecondaryBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Footer  */}
                                    <GrBorderBox className="p-px md:p-[2px] w-full">
                                        <div className="w-full min-h-[20px] bg-gr-purple-dark p-4 md:p-5 flex items-center gap-3 justify-end">
                                            <SecondaryBtn onClick={closeModal} filled={false} className="border-white/10 py-3 px-8 w-full md:w-auto">
                                                Cancel
                                            </SecondaryBtn>
                                            <PrimaryBtn className="py-3 h-full px-8 w-full md:w-auto">
                                                {variant === "add" ? "Add" : "Save"}
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

