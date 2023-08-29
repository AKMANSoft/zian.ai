import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode, useEffect, useState } from 'react';
import useAuthUserStore from "@/lib/zustand/authUserStore";
import LoadingSparkle from "./LoadingSparkle";


type Props = {
    children?: ReactNode;
    heading?: string;
    description?: string;
    secure?: boolean;
}

const noSidebarPaths = ["/signup", "/login", "/forgot-password", "/reset-password","/login-with-email","/email-sent"]
export default function MainLayout({ children, heading = "", description, secure = true }: Props) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [menuExpanded, setMenuExpanded] = useState(false);
    const { authUser } = useAuthUserStore();
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        if (!secure) return setShowPage(true)
        if (authUser?.token && authUser.token !== "") {
            return setShowPage(true)
        }
        navigate("/login")
    }, [authUser, navigate, secure])

    return (
        !showPage ?
            <div className="flex w-full h-screen items-center justify-center">
                <LoadingSparkle spark variant="large" />
            </div>
            :
            <div className="w-full flex gap-5">
                {
                    (!noSidebarPaths.includes(pathname) && !pathname.startsWith("/reset-password")) &&
                    <SideBar expanded={menuExpanded} />
                }
                <div className="flex flex-col w-full max-w-full overflow-x-hidden max-h-screen overflow-y-auto px-2 xs:px-4 lg:px-5 bg-gr-purple lg:bg-none">
                    {
                        (!noSidebarPaths.includes(pathname) && !pathname.startsWith("/reset-password")) &&
                        <Header
                            heading={heading}
                            description={description}
                            menuExpanded={menuExpanded}
                            onToggleMenu={() => setMenuExpanded(!menuExpanded)} />
                    }
                    <div className="xl:hidden mb-4 text-center lg:text-start">
                        <h2 className="text-[32px] leading-9 text-white font-nebula">
                            {heading}
                        </h2>
                        {
                            description &&
                            <p className="text-base font-jakarta">{description}</p>
                        }
                    </div>
                    {children}
                </div>
            </div>
    )
}

