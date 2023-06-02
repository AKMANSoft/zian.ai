import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode, useState } from 'react';


type Props = {
    children?: ReactNode;
    heading: string;
}

export default function MainLayout({ children, heading }: Props) {
    const [menuExpanded, setMenuExpanded] = useState(false);
    return (
        <div className="w-full flex gap-5">
            <SideBar expanded={menuExpanded} />
            <div className="flex flex-col w-full px-2 xs:px-4 lg:px-5">
                <Header heading={heading} menuExpanded={menuExpanded} onToggleMenu={()=> setMenuExpanded(!menuExpanded)} />
                {children}
            </div>
        </div>
    )
}

