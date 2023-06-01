import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../lib/utils';
import GrBorderBox from "./ui/gr-border-box";


type Props = {
    heading: string;
    menuExpanded?: boolean;
    onToggleMenu: () => void;
}

export default function Header({ heading, onToggleMenu, menuExpanded = false }: Props) {
    return (
        <header className="mt-4 lg:mt-7 mb-9 flex items-start lg:items-center justify-between w-full">
            <h2 className="hidden lg:inline text-[32px] leading-9 text-white font-nebula font-normal">
                {heading}
            </h2>
            <img src="/images/avatar.png" width={60} height={60}
                className={cn(
                    "w-[60px] h-auto aspect-square rounded-full overflow-hidden"
                )}
                alt="" />
            <div className='flex items-center gap-2 h-[50px]'>
                <SearchEl />
                <GrBorderBox className="rounded-20 h-full">
                    <button type="button" className='box-gr-border backdrop-blur-[10px] text-lg px-[10px] lg:px-3 h-full w-auto aspect-square text-white bg-gr-purple rounded-20'>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                </GrBorderBox>
                <GrBorderBox className="rounded-20 h-full hidden lg:block">
                    <div className={cn(
                        "box-gr-border aspect-square lg:aspect-auto",
                        'text-lg h-full text-white bg-gr-purple rounded-20',
                        "inline-flex items-center p-[10px] lg:p-3 lg:pr-10 gap-[10px]",
                        "backdrop-blur-[10px]"
                    )}>
                        <img src="/images/mike.png" width={32} height={32}
                            className='h-full w-auto aspect-square rounded-full object-contain object-center' />
                        <span className='hidden lg:inline text-sm font-bold'>Mike Males</span>
                    </div>
                </GrBorderBox>
                <GrBorderBox className={cn(
                    "rounded-20 block lg:hidden z-[52]",
                    menuExpanded ? "fixed top-4 right-4 h-12" : "h-full"
                )}>
                    <button onClick={onToggleMenu} type="button" className='box-gr-border backdrop-blur-[10px] text-lg px-[10px] lg:px-3 h-full w-auto aspect-square text-white bg-gr-purple rounded-20'>
                        <FontAwesomeIcon icon={menuExpanded ? faXmark : faBars} />
                    </button>
                </GrBorderBox>
            </div>
        </header>
    );
}



function SearchEl() {
    return (
        <GrBorderBox className="rounded-20 h-full">
            <div className={cn(
                "box-gr-border aspect-square lg:aspect-auto",
                "h-full w-auto lg:w-[300px] bg-gr-purple backdrop-blur-[10px] rounded-20",
                "flex items-center justify-center lg:justify-start lg:gap-3 p-[10px] lg:p-3 text-white"
            )}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                {/* <input type="text" className='hidden lg:inline bg-transparent w-full text-sm font-normal h-full outline-none border-none text-white placeholder:text-th-gray' placeholder='Search' /> */}
            </div>
        </GrBorderBox>
    );
}