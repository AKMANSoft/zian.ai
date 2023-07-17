import MainLayout from "../components/layout";
import ForgotPassword from "@/components/popups/ForgotPasswordPopup";
import CreateNewPasswordPopup from "@/components/popups/CreateNewPasswordPopup";
import EmailErrorPopup from "@/components/popups/EmailErrorPopup";
import ChangePasswordPopup from "@/components/popups/ChangePasswordPopup";
import Anchor from "@/components/ui/anchor-link";



export default function PopupPage() {

    return (
        <MainLayout heading="Drafts">
            <div>
                <ForgotPassword
                />
                
                <CreateNewPasswordPopup
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







