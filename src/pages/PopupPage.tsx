// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../components/layout";
// import { faChevronLeft, faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { cn } from "../lib/utils";
import { SecondaryBtn } from "../components/ui/buttons";
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
import SignUpPage from "./SignUp";
import Anchor from "@/components/ui/anchor-link";
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
                <ForgotPassword
                />
                <InstructionsSentPopup
                />
                <CreateNewPasswordPopup
                />
                <NewPasswordCreatedPopup
                />
                <OnboardingPopup
                />
                <PasswordUpdatedPopup
                />
                <EmailErrorPopup
                />
                <ChangePasswordPopup
                />
                <div className="flex gap-8">
                    <Anchor href="/login">Login</Anchor>
                    <Anchor href="/signup">Sign Up</Anchor>
                </div>
            </div>
        </MainLayout>
    );
}







