// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
// import { faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { cn } from "../lib/utils";
import { PrimaryBtn, PrimaryBtnNeon} from "../components/ui/buttons";
// import { useState, useRef } from "react";
// import { formatNumberto0 } from "@/components/calendar/defaults";
// import PostViewPopup from "@/components/drafts/PostViewPopup";
// import AddEditDraftPopup from "@/components/drafts/AddEditDraftPopup";
// import WarningPopup from "@/components/WarningPopup";



// const filters = [
//     "Announcements",
//     "Giveaways",
//     "Engagement Questions",
//     "Engagement Questions",
//     "Promotions",
// ]


export default function DashboardAr() {
    // const [activeTab, setActiveTab] = useState(0);
    // const tabsContainerRef = useRef<HTMLDivElement>(null);

    // // const onTabsScrollClick = (reverse = false) => {
    // //     tabsContainerRef.current?.scrollBy({
    // //         behavior: "smooth",
    // //         left: 300 * (reverse ? -1 : 1)
    // //     })
    // // }

    return (
        <MainLayout >
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="p-3 md:p-5 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    <div className="flex md:h-screen w-full justify-center items-center">
                        <div className="flex flex-col text-center justify-center items-center max-w-xl">
                            <div className="mx-[7px] md:mx-0">
                                <h1 className="font-nebula md:text-[32px] text-2xl font-normal text-white">
                                    Welcome, Mike
                                </h1>
                                <h2 className="font-jakarta md:text-2xl text-base font-normal text-white">
                                    To get started, click "GENERATE EXAMPLE" below!
                                </h2>
                                <p className="font-jakarta md:text-base  text-sm font-normal text-white/80 py-5">
                                    If no examples are available yet, please wait for our team to notify you that your account is ready, and in the meantime view Integration to connect the system with your site. Reach out to hello@zian.ai if you need support
                                </p>
                            </div>
                            <div className="flex md:flex-row flex-col my-5 gap-[10px] w-auto">
                                <PrimaryBtn className="">
                                    Upgrade
                                </PrimaryBtn>
                                <PrimaryBtnNeon>
                                    Generate Example
                                </PrimaryBtnNeon>
                            </div>
                        </div>
                    </div>
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}







