import { BellIcon, SearchIcon } from 'lucide-react'
import { cn } from '../lib/utils';


export default function Header() {
    return (
        <header className="mt-7 mb-9 flex items-center justify-between w-full">
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal">
                Welcome, Mike
            </h2>
            <div className='flex items-center gap-2 h-[50px]'>
                <SearchEl />
                <button type="button" className='backdrop-blur-[10px] text-lg px-3 h-full w-auto aspect-square text-white bg-gr-purple rounded-[20px]'>
                    <BellIcon />
                </button>
                <div className={cn(
                    'text-lg h-full text-white bg-gr-purple rounded-[20px]',
                    "inline-flex items-center pl-3 pr-10 gap-[10px]",
                    "backdrop-blur-[10px]"
                )}>
                    <img src="/images/mike.png" width={32} height={32}
                        className='w-8 h-8 aspect-square rounded-full object-cover object-center' />
                    <span className='text-sm font-bold'>Mike Males</span>
                </div>
            </div>
        </header>
    );
}



function SearchEl() {
    return (
        <div className={cn(
            "h-full w-[300px] bg-gr-purple backdrop-blur-[10px] border-gr-angular rounded-[20px]",
            "flex items-center gap-3 px-3 text-white"
        )}>
            <SearchIcon size={20} />
            <input type="text" className='bg-transparent text-sm font-normal h-full outline-none border-none text-white placeholder:text-th-gray' placeholder='Search' />
        </div>
    );
}