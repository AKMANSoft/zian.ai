// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
// import { faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { cn } from "../lib/utils";
import { SecondaryBtn} from "../components/ui/buttons";
import LoginPopup from "@/components/popups/LoginPopup";
import ForgotPassword from "@/components/popups/ForgotPasswordPopup";
import InstructionsSentPopup from "@/components/popups/InstructionsSentPopup";
import CreateNewPasswordPopup from "@/components/popups/CreateNewPasswordPopup";
import NewPasswordCreatedPopup from "@/components/popups/NewPasswordCreatedPopup";
import OnboardingPopup from "@/components/popups/OnboardingPopup";
import PasswordUpdatedPopup from "@/components/popups/PasswordUpdatedPopup";
import EmailErrorPopup from "@/components/popups/EmailErrorPopup";
import ChangePasswordPopup from "@/components/popups/ChangePasswordPopup";
import EditProfilePopup from "@/components/popups/EditProfilePopup";
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


export default function PopupPage() {
    // const [activeTab, setActiveTab] = useState(0);
    // const tabsContainerRef = useRef<HTMLDivElement>(null);

    // // const onTabsScrollClick = (reverse = false) => {
    // //     tabsContainerRef.current?.scrollBy({
    // //         behavior: "smooth",
    // //         left: 300 * (reverse ? -1 : 1)
    // //     })
    // // }

    return (
        <MainLayout heading="Drafts">
           <div>
           <SecondaryBtn className="p-3">
                        <LoginPopup />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <ForgotPassword
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <InstructionsSentPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <CreateNewPasswordPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <NewPasswordCreatedPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <OnboardingPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <PasswordUpdatedPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <EmailErrorPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <ChangePasswordPopup
                        />
                    </SecondaryBtn>
                    <SecondaryBtn>
                        <EditProfilePopup
                        />
                    </SecondaryBtn>
                   
           </div>
        </MainLayout>
    );
}







