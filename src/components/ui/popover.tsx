
// import * as React from "react"
// import * as PopoverPrimitive from "@radix-ui/react-popover"

// import { cn } from "@/lib/utils"

// const Popover = PopoverPrimitive.Root

// const PopoverTrigger = PopoverPrimitive.Trigger

// const PopoverContent = React.forwardRef<
//   React.ElementRef<typeof PopoverPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
// >(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => (
//   <PopoverPrimitive.Portal>
//     <PopoverPrimitive.Content
//       ref={ref}
//       align={align}
//       sideOffset={sideOffset}
//       className={cn(
//         "z-50 w-[350px]  rounded-20 bg-purple-500 p-5 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <div className="bg-purple-500 rotate-45 h-6 w-6 absolute left-1/2 top--1 md:left-5"/>
//     </PopoverPrimitive.Content>
//   </PopoverPrimitive.Portal >
// ))
// PopoverContent.displayName = PopoverPrimitive.Content.displayName

// export { Popover, PopoverTrigger, PopoverContent }
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import BillingPopup from "../popups/BillingPopup"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger


const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
  const isBillingPopupVisible = BillingPopup();
  const contentClassName = cn(
    "z-50 p-5 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    className,
    isBillingPopupVisible ? "bg-purple-500 rounded-20 ml-3 w-[280px] md:w-[350px]" : "bg-purple-500 rounded-20 w-[350px]"
  );

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
        {...props}
      >
        {children}
        <div className="bg-purple-500 rotate-45 h-6 w-6 absolute left-1/2 top--1 md:left-5" />


      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };



