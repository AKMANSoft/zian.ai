import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"



type InputElProps = {
  label: string;
  placeholder?: string;
}

export default function InputEl({ label, placeholder = "" }: InputElProps) {

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

export { Input, InputEl }



