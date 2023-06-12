import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { faChevronLeft, faChevronRight, faEdit, faEye, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { PrimaryBtn, SecondaryBtn } from "../components/ui/buttons";
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { SmallSchedulePostEl } from "../components/postview-section";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";



const filters = [
    "Announcements",
    "Giveaways",
    "Engagement Questions",
    "Engagement Questions",
    "Promotions",
]


export default function DraftsPage() {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <MainLayout heading="Drafts">
            <GrBorderBox className="p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                <div className="p-5 h-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    {/* Tabs List View  */}
                    <div className="relative min-h-[50px] flex justify-center gap-3">
                        <button className="absolute top-0 left-0 h-full aspect-square rounded-10 bg-transparent hover:text-primary text-white">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <div className="flex mx-16 max-w-[calc(100vw_-_540px)] h-full gap-3 no-scrollbar overflow-x-auto">
                            {
                                [...filters, ...filters].map((filter, index) => (
                                    <TabItem
                                        key={filter} text={filter}
                                        active={index === activeTab}
                                        onClick={() => setActiveTab(index)} />
                                ))
                            }
                        </div>

                        <button className="absolute top-0 right-0 h-full aspect-square rounded-10 bg-transparent hover:text-primary text-white">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    {/* Drafts Table  */}
                    <div className="-mt-px bg-gr-purple-light border border-primary rounded-10 max-h-full max-w-[100%] overflow-auto">
                        <table className="text-white font-jakarta table-auto w-full">
                            <thead className="border-b-[5px] border-primary bg-[#664f8e]">
                                <tr>
                                    <th className="py-3 min-h-[50px] text-start pl-7 w-24">#</th>
                                    <th className="py-3 min-h-[50px] text-start w-32 px-5">Photo</th>
                                    <th className="py-3 min-h-[50px] text-start px-5 max-w-[200px]">Content</th>
                                    <th className="py-3 min-h-[50px] text-start w-44 px-5">Status</th>
                                    <th className="py-3 min-h-[50px] text-start w-48 px-5">Username</th>
                                    <th className="py-3 min-h-[50px] text-start px-5">Created Date</th>
                                    <th className="py-3 min-h-[50px] text-start px-12">Actions</th>
                                    <th className="py-3 min-h-[50px] text-start pr-7">Photo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                                <DraftItemPopup />
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination  */}
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}



type SingleTableRowProps = {
    onClick?: () => void
}


function SingleTableRow({ onClick }: SingleTableRowProps) {
    return (
        <tr role="button" onClick={onClick}>
            <td className="py-5 pl-7">01</td>
            <td className="py-5 px-5">
                <img src="/images/table-img.png" width={80} height={80} alt="" />
            </td>
            <td className="py-5 px-5">
                <p className="line-clamp-4 max-w-[200px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquid doloribus mollitia magni fugiat quisquam rerum a alias aspernatur, dolorem in neque dolore sed quis hic nulla animi minima debitis.
                </p>
            </td>
            <td className="py-5 px-5">
                Scheduled
            </td>
            <td className="py-5 px-5">
                moonlanding.media
            </td>
            <td className="py-5 px-5">
                April 2022,  Sunday   2:00PM
            </td>
            <td className="py-5 px-12">
                <div className="inline-flex items-center gap-2">
                    <SecondaryBtn className="p-3">
                        <FontAwesomeIcon icon={faEye} />
                    </SecondaryBtn>
                    <SecondaryBtn className="p-3">
                        <FontAwesomeIcon icon={faEdit} />
                    </SecondaryBtn>
                    <SecondaryBtn className="p-3">
                        <FontAwesomeIcon icon={faTrash} />
                    </SecondaryBtn>
                </div>
            </td>
            <td className="py-5 pr-7">
                <PrimaryBtn className="py-3 px-5 h-12">
                    Regenerate
                </PrimaryBtn>
            </td>
        </tr>
    );
}



type TabItemProps = {
    text: string;
    className?: string;
    active?: boolean;
    onClick?: () => void
}

function TabItem({ text, className, active = false, onClick }: TabItemProps) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "min-w-max h-full px-6 rounded-t-10 text-white border",
            active ? "bg-[#664f8e] border-primary border-b-[#664f8e]" : "bg-transparent border-transparent",
            className
        )}>
            {text}
        </button>
    );
}




function DraftItemPopup() {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <SingleTableRow onClick={openModal} />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                    "w-full max-w-xl transform overflow-hidden rounded-20 bg-gr-purple-dark py-2 shadow-xl transition-all",
                                    "relative"
                                )}>
                                    <button type="button" onClick={closeModal}
                                        className="text-white text-3xl font-semibold outline-none absolute top-5 right-8 cursor-pointer">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <div className="p-8 pb-16 pt-24 max-h-[calc(100vh_-_100px)] overflow-y-auto no-scrollbar">
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
                                                <img src="/images/today-post.png"
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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


