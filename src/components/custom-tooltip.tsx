import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PrimaryBtn } from "./ui/buttons";


type Props = {
  title: string;
  content: React.ReactNode;
  className:string;
}
export default function CustomTooltip({title,content ,className}:Props) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={(value) => setOpen(value)}>
      <PopoverTrigger>
        <PrimaryBtn  className={className}  onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          {title}
        </PrimaryBtn>
      </PopoverTrigger>
      <PopoverContent className="bg-purple-500 font-base font-normal font-jakarta text-white" align="start" side="top" >
        {content}
      </PopoverContent>
    </Popover>
  )
}
