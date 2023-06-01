import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome, faArrowRight, faCreditCard,
    faCalendar, faSliders, faBook, faFile
} from '@fortawesome/free-solid-svg-icons';
import { cn } from "../lib/utils";
import { GrSeperator } from "./ui/seperator";
import { useLocation } from "react-router-dom";



type Props = {
    expanded?: boolean;
}


export default function SideBar({ expanded = false }: Props) {
    const { pathname } = useLocation();
    return (
        <div className={cn(
            "min-w-[280px] w-full md:max-w-[280px] min-h-screen pt-20 lg:pt-[135px] pb-10",
            "flex flex-col gap-40 lg:gap-20 justify-between z-50 px-4 lg:px-0",
            "fixed -top-full left-0 lg:relative bg-[#1E162E] lg:bg-transparent",
            "max-h-screen overflow-y-auto transition-all",
            expanded && "top-0"
        )}>
            <div className="w-full">
                <img src="/images/avatar.png" width={120} height={120}
                    className={cn(
                        "w-[60px] lg:w-[120px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                        "hidden lg:block"
                    )}
                    alt="" />
                <div className="mt-[30px] w-full">
                    <NavigationItem
                        href="/" active={pathname === "/"}
                        text="Home"
                        icon={<FontAwesomeIcon icon={faHome} />} />
                    <GrSeperator className="mt-6 mb-2" />
                    <NavigationItem
                        href="/generate" active={pathname === "/generate"}
                        className="my-0.5"
                        text="Generate Content"
                        icon={<FontAwesomeIcon icon={faFile} />} />
                    <NavigationItem
                        href="/calendar" active={pathname === "/calendar"}
                        className="my-0.5"
                        text="Calendar"
                        icon={<FontAwesomeIcon icon={faCalendar} />} />
                    <NavigationItem
                        href="/drafts" active={pathname === "/drafts"}
                        className="my-0.5" text="Drafts"
                        icon={<FontAwesomeIcon icon={faBook} />} />
                    <GrSeperator className="my-2" />
                    <NavigationItem
                        href="/settings" active={pathname === "/settings"}
                        className="mb-3"
                        text="Settings"
                        icon={<FontAwesomeIcon icon={faSliders} />} />
                    <GrSeperator />
                </div>
            </div>
            <div className="w-full px-12">
                <h5 className="text-sm font-bold text-white inline-flex items-center gap-3">
                    <FontAwesomeIcon icon={faCreditCard} />
                    Plan Name
                </h5>
                <span className="mt-7 block w-full h-1 bg-th-gray rounded-full">
                    <span className="block h-full w-1/2 bg-primary rounded-full"></span>
                </span>
                <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-xs font-normal text-white">Credits used</p>
                    <p className="text-xs font-normal text-white">14 / 32</p>
                </div>
                <h5 className="mt-7 w-full text-sm font-bold text-white inline-flex items-center justify-between gap-3">
                    Manage Plan
                    <a href="#">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                </h5>
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
}

function NavigationItem({ text, className, icon, active = false, href = "#" }: NavigationItemProps) {
    return (
        <a href={href} className={cn(
            "font-bold text-sm transition-all duration-300 rounded-full lg:rounded-r-full",
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