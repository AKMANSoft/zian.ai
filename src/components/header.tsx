import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../lib/utils';
import GrBorderBox from "./ui/gr-border-box";


type Props = {
    heading: string;
}

export default function Header({ heading }: Props) {
    return (
        <header className="mt-7 mb-9 flex items-center justify-between w-full">
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal">
                {heading}
            </h2>
            <div className='flex items-center gap-2 h-[50px]'>
                <SearchEl />
                <GrBorderBox className="rounded-20 h-full">
                    <button type="button" className='box-gr-border backdrop-blur-[10px] text-lg px-3 h-full w-auto aspect-square text-white bg-gr-purple rounded-20'>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                </GrBorderBox>
                <GrBorderBox className="rounded-20 h-full">
                    <div className={cn(
                        "box-gr-border",
                        'text-lg h-full text-white bg-gr-purple rounded-20',
                        "inline-flex items-center pl-3 pr-10 gap-[10px]",
                        "backdrop-blur-[10px]"
                    )}>
                        <img src="/images/mike.png" width={32} height={32}
                            className='w-8 h-8 aspect-square rounded-full object-cover object-center' />
                        <span className='text-sm font-bold'>Mike Males</span>
                    </div>
                </GrBorderBox>
            </div>
        </header>
    );
}



function SearchEl() {
    return (
        <GrBorderBox className="rounded-20 h-full">
            <div className={cn(
                "box-gr-border",
                "h-full w-[300px] bg-gr-purple backdrop-blur-[10px] rounded-20",
                "flex items-center gap-3 px-3 text-white"
            )}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input type="text" className='bg-transparent text-sm font-normal h-full outline-none border-none text-white placeholder:text-th-gray' placeholder='Search' />
            </div>
        </GrBorderBox>
    );
}