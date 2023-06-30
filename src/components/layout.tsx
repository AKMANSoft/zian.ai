import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode, useState } from 'react';


type Props = {
    children?: ReactNode;
    heading: string;
    user?: any;
}

export default function MainLayout({ children, heading, user }: Props) {
    const [menuExpanded, setMenuExpanded] = useState(false);
  // console.log('main layout');
  // console.log({user});
    return (
        <div className="w-full flex gap-5">
            <SideBar expanded={menuExpanded} user={user} />
            <div className="flex flex-col w-full max-w-full overflow-hidden px-2 xs:px-4 lg:px-5">
                <Header heading={heading} menuExpanded={menuExpanded} onToggleMenu={()=> setMenuExpanded(!menuExpanded)} user={user} />
                {children}
            </div>
        </div>
    )
}

