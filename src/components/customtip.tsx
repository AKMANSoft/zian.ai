import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PrimaryBtn } from "./ui/buttons";

type Props = {
  title: string;
  content: React.ReactNode;
  className: string;
};
export  function CustomTooltip({ title, content, className }: Props) {
    const [open, setOpen] = useState(false);
    const handleButtonClick = () => {
      setOpen(!open);
    }; 
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <PrimaryBtn
            className={className}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {title}
          </PrimaryBtn>
        </PopoverTrigger>
        {open && (
          <PopoverContent
            className="bg-purple-500 font-base font-normal font-jakarta text-white"
            onClick={handleButtonClick}
            align="start"
            side="top"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {content}
          </PopoverContent>
        )}
      </Popover>
    );
  }


