import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PrimaryBtn } from "./ui/buttons";



export default function CustomTooltip() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={(value) => setOpen(value)}>
      <PopoverTrigger>
        <PrimaryBtn onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          Upgrade
        </PrimaryBtn>
      </PopoverTrigger>
      <PopoverContent className="bg-purple-500 font-base font-normal font-jakarta text-white">
        To change your plan or increase your weekly quota, please email hello@zian.ai
      </PopoverContent>
    </Popover>
  )
}
