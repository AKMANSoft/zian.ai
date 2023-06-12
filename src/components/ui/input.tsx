import { cn } from "../../lib/utils";




type Props = {
    label: string;
    placeholder?: string;
}

export default function InputEl({ label, placeholder = "" }: Props) {

    return (
        <div className="w-full">
            <label htmlFor={label.replaceAll(" ", "_")} className={cn(
                "text-base leading-7 font-semibold font-jakarta text-white"
            )}>
                {label}
            </label>
            <input type="text" id={label.replaceAll(" ", "_")} placeholder={placeholder}
                className={cn(
                    "text-white text-start font-jakarta font-semibold text-sm leading-6 py-4 px-5",
                    "border border-white/10 bg-input rounded-10 w-full bg-transparent mt-2",
                    "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70"
                )} />
        </div>
    )
}