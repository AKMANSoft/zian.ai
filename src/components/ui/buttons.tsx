import { ReactNode } from "react";
import { cn } from "../../lib/utils";


type Props = {
    className?: string;
    children: ReactNode;
    filled?: boolean;
}


export function SecondaryBtn({ className, children, filled = true }: Props) {
    return (
        <button type="button" className={cn(
            "border border-white/5 transition-all duration-300 hover:bg-white/20 rounded-lg py-[8px] px-4",
            filled && "bg-white/[0.06]",
            "inline-flex items-center gap-2 text-white text-xs font-semibold justify-center",
            className
        )}>
            {children}
        </button>
    )
}




export function PrimaryBtn({ className, children }: Props) {
    return (
        <button type="button" className={cn(
            "primary-btn bg-primary shadow-primary-btn hover:shadow-primary-btn-lg",
            "transition-all duration-300 rounded-lg py-[8px] px-4",
            "inline-flex items-center gap-2 text-white text-xs font-semibold justify-center",
            className
        )}>
            {children}
        </button>
    )
}




export function PrimaryBtnNeon({ className, children }: Props) {
    return (
        <button type="button" className={cn(
            "primary-btn-neon",
            className
        )}>
            {children}
        </button>
    )
}
