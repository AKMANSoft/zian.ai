import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome, faCreditCard,
    faFile, faPen, faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { cn } from "../lib/utils";
import { GrSeperator } from "./ui/seperator";
import { useLocation } from "react-router-dom";
import UserDropdownMenu from "./dropmenus/UserDropMenu";
import EditProfilePopup from "./popups/EditProfilePopup";





type Props = {
    expanded?: boolean;
}


export default function SideBar({ expanded = false }: Props) {
    const { pathname } = useLocation();
    return (
        <div className={cn(
            "min-w-[280px] w-full lg:max-w-[400px] xl:max-w-[300px] min-h-screen pt-5 pb-10",
            "flex flex-col gap-20 lg:gap-10 justify-between z-50 px-6 lg:pl-0",
            "fixed top-0 -left-full xl:static bg-[#1E162E] xl:bg-transparent",
            "max-h-screen overflow-y-auto transition-all",
            expanded && "left-0"
        )}>
            <div className="w-full">
                <img src="/images/avatar.png" width={120} height={120} loading="lazy"
                    className={cn(
                        "w-[120px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                        "hidden xl:block"
                    )}
                    alt="" />
                <div className="mt-16 md:mt-4 w-full">
                    <div className="py-3">
                        {/* <UserHeaderComponent expandable className="lg:hidden" toggleClassName="h-[71px]" /> */}
                        <UserDropdownMenu className="h-[71px] md:hidden" />
                    </div>
                    <NavigationItem
                        href="/" active={pathname === "/"}
                        text="Home"
                        icon={<FontAwesomeIcon icon={faHome} />} />
                    <GrSeperator className="mt-6 mb-2" />
                    <NavigationItem
                        href="/customize" active={pathname === "/customize"}
                        className="my-0.5"
                        text="Customize"
                        icon={<FontAwesomeIcon icon={faPen} />} />
                    <NavigationItem
                        href="/integrate" active={pathname === "/integrate"}
                        className="my-0.5"
                        text="Integrate API"
                        icon={<FontAwesomeIcon icon={faFile} />} />
                    <GrSeperator className="my-2" />
                    <EditProfilePopup/>
                    <NavigationItem
                        href="/billing" active={pathname === "/billing"}
                        className="mb-3"
                        text="Billing & Plan"
                        icon={<FontAwesomeIcon icon={faCreditCard} />} />
                    <GrSeperator className="my-2" />
                    <NavigationItem
                        href="/logout" active={pathname === "/logout"}
                        className="my-0.5" text="Log out"
                        icon={<FontAwesomeIcon icon={faSignOut} />} />
                    {/* <SecondaryBtn className="p-3">
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
                    <SecondaryBtn>
                        <ArticleViewPopup
                        />
                    </SecondaryBtn>
                     */}
                </div>
            </div>

        </div>
    );
}



type NavigationItemProps = {
    text: string;
    href?: string;
    icon: React.ReactNode
    active?: boolean;
    className?: string;
    onClick?: ()=> void;
}

export function NavigationItem({ text, className, icon, onClick, active = false, href = "#" }: NavigationItemProps) {
    return (
        <a href={href} onClick={onClick} className={cn(
            "font-bold text-sm transition-all duration-300 rounded-full lg:rounded-none lg:rounded-r-full",
            "inline-flex gap-3 items-center py-5 px-12 w-full",
            active ? "shadow-navigation-item" : "hover:shadow-navigation-item",
            active ? "text-primary" : "text-white hover:text-primary",
            active ? "bg-white" : "bg-transparent hover:bg-white",
            className
        )}>
            {icon}
            {text}
        </a>
    );
}