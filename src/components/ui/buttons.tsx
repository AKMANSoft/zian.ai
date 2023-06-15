import { ReactNode } from "react";
import { cn } from "../../lib/utils";


type Props = {
    className?: string;
    children: ReactNode;
    filled?: boolean;
    active?: boolean;
    onClick?: () => void
}


export function SecondaryBtn({ className, children, filled = true, onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "border border-white/5 transition-all duration-300 hover:bg-white/20 rounded-lg py-[8px] px-4 outline-none",
            filled && "bg-white/[0.06]",
            "inline-flex items-center gap-2 text-white text-xs font-semibold justify-center",
            className
        )}>
            {children}
        </button>
    )
}




export function PrimaryBtn({ className, children, onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "primary-btn bg-primary shadow-primary-btn hover:shadow-primary-btn-lg outline-none",
            "transition-all duration-300 rounded-lg py-[8px] px-4",
            "inline-flex items-center gap-2 text-white text-sm font-semibold justify-center",
            className
        )}>
            {children}
        </button>
    )
}




export function PrimaryBtnNeon({ className, children, onClick }: Props) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "primary-btn-neon outline-none",
            className
        )}>
            {children}
        </button>
    )
}


export function PrimaryWithNeon({ className, children, onClick, active }: Props) {
    return (
        <button type="button" onClick={onClick} className={cn(
            "primary-btn-neon outline-none transition-all duration-300",
            active ? "bg-primary" : "hover:bg-primary/60",
            className
        )}>
            {children}
        </button>
    )
}

