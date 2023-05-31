import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Listbox } from "@headlessui/react"
import { useState } from "react"
import { cn } from "../../lib/utils"


type Option = {
    value: string;
    text: string;
    disabled: boolean;
}


type Props = {
    label?: string;
    className?: string;
    optClassName?: string;
    optContainerClassName?: string;
    containerClassName?: string;
    options: Option[];
}


export default function SelectEl({ label, options, className = "", containerClassName, optClassName, optContainerClassName }: Props) {
    const [selectedOpt, setSelectedOpt] = useState(options[0])

    return (
        <Listbox value={selectedOpt} onChange={setSelectedOpt}>
            <div className={cn("relative w-full", containerClassName)}>
                {
                    (label && label !== "") &&
                    <Listbox.Label className={cn(
                        "text-base leading-7 font-semibold font-jakarta text-white"
                    )}>
                        {label}
                    </Listbox.Label>
                }
                <Listbox.Button
                    className={cn(
                        "text-white/70 text-start font-jakarta font-semibold text-sm leading-6 py-4 px-5",
                        "border border-white/10 bg-input rounded-10 w-full",
                        "inline-flex items-center justify-between gap-3",
                        "data-[headlessui-state=open]:bg-th-gray/10",
                        (label && label !== "") && "mt-2",
                        className
                    )}>
                    {selectedOpt.text}
                    <FontAwesomeIcon icon={faChevronDown} />
                </Listbox.Button>
                {/* <div className="relative w-max"> */}
                <Listbox.Options className={cn(
                    "absolute mt-2 top-full left-0 w-full bg-th-gray/10 backdrop-blur-[10px] rounded-10 overflow-hidden outline-none",
                    "border-2 border-th-gray/20",
                    optContainerClassName
                )}>
                    {
                        options.map((opt) => (
                            <Listbox.Option
                                key={opt.value}
                                value={opt}
                                disabled={opt.disabled}
                                className={cn(
                                    "text-white text-start font-jakarta font-medium text-sm leading-6 py-4 px-5",
                                    "border-b last:border-none border-white/10 w-full",
                                    "data-[headlessui-state=active]:bg-gr-purple data-[headlessui-state=disabled]:bg-gray-600/50",
                                    selectedOpt.value === opt.value ? "bg-gr-purple" : "bg-transparent [&:not(:data-[headlessui-state=disabled])]:hover:bg-gr-purple",
                                    optClassName
                                )}
                            >
                                {opt.text}
                            </Listbox.Option>
                        ))
                    }
                </Listbox.Options>
                {/* </div> */}
            </div>
        </Listbox>
    )
}