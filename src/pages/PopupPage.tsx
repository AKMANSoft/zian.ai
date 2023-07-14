import MainLayout from "../components/layout";
import ForgotPassword from "@/components/popups/ForgotPasswordPopup";
import InstructionsSentPopup from "@/components/popups/InstructionsSentPopup";
import CreateNewPasswordPopup from "@/components/popups/CreateNewPasswordPopup";
import NewPasswordCreatedPopup from "@/components/popups/NewPasswordCreatedPopup";
import OnboardingPopup from "@/components/popups/OnboardingPopup";
import PasswordUpdatedPopup from "@/components/popups/PasswordUpdatedPopup";
import EmailErrorPopup from "@/components/popups/EmailErrorPopup";
import ChangePasswordPopup from "@/components/popups/ChangePasswordPopup";
import Anchor from "@/components/ui/anchor-link";



export default function PopupPage() {

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
                    <Anchor href="/dashboard">Dashboard Page (login to see articles loaded on dashboard page)</Anchor>
                </div>
            </div>
        </MainLayout>
    );
}







