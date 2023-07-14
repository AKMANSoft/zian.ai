import { useLocation } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode, useState } from 'react';


type Props = {
    children?: ReactNode;
    heading?: string;
    description?: string;
}

const noSidebarPaths = ["/signup", "/login"]

export default function MainLayout({ children, heading = "", description }: Props) {
    const { pathname } = useLocation()
    const [menuExpanded, setMenuExpanded] = useState(false);
    return (
        <div className="w-full flex gap-5">
            {
                !noSidebarPaths.includes(pathname) &&
                <SideBar expanded={menuExpanded} />
            }
            <div className="flex flex-col w-full max-w-full overflow-x-hidden max-h-screen overflow-y-auto px-2 xs:px-4 lg:px-5">
                {
                    !noSidebarPaths.includes(pathname) &&
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

