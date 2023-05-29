import {
    HomeIcon, FileSpreadsheetIcon, CalendarIcon,
    LayoutListIcon, SlidersHorizontalIcon, CreditCardIcon,
    ArrowRightIcon
} from "lucide-react";
import { cn } from "../lib/utils";
import { GrSeperator } from "./ui/seperator";




export default function SideBar() {
    return (
        <div className="min-w-[300px] max-w-[300px] w-full min-h-screen pt-[135px] pb-10 flex flex-col gap-10 justify-between">
            <div className="w-full">
                <img src="/images/avatar.png" width={120} height={120}
                    className="w-[120px] h-auto aspect-square rounded-full overflow-hidden mx-auto"
                    alt="" />
                <div className="mt-[30px] w-full">
                    <NavigationItem text="Home" icon={<HomeIcon />} active={true} />
                    <GrSeperator className="mt-6 mb-2" />
                    <NavigationItem className="my-0.5" text="Generate Content" icon={<FileSpreadsheetIcon />} />
                    <NavigationItem className="my-0.5" text="Calendar" icon={<CalendarIcon />} />
                    <NavigationItem className="my-0.5" text="Drafts" icon={<LayoutListIcon />} />
                    <GrSeperator className="my-2" />
                    <NavigationItem className="mb-3" text="Settings" icon={<SlidersHorizontalIcon />} />
                    <GrSeperator />
                </div>
            </div>
            <div className="w-full px-12">
                <h5 className="text-sm font-bold text-white inline-flex items-center gap-3">
                    <CreditCardIcon />
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
                        <ArrowRightIcon size={18} />
                    </a>
                </h5>
            </div>
        </div>
    );
}



type NavigationItemProps = {
    text: string;
    icon: React.ReactNode
    active?: boolean;
    className?: string;
}

function NavigationItem({ text, className, icon, active = false }: NavigationItemProps) {
    return (
        <a href="#" className={cn(
            "font-bold text-sm transition-all duration-300 rounded-r-full",
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