import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode } from 'react';


type Props = {
    children?: ReactNode;
    heading: string;
}

export default function MainLayout({ children, heading }: Props) {
    return (
        <div className="w-full h-full flex gap-5">
            <SideBar />
            <div className=" flex flex-col w-full px-5">
                <Header heading={heading} />
                {children}
            </div>
        </div>
    )
}

