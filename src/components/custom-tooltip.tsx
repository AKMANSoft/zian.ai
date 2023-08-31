import { useState } from "react";
import { Billingover, BillingoverContent, BillingoverTrigger } from "./ui/Popover2";
import { PrimaryBtn } from "./ui/buttons";

type Props = {
  title: string;
  content: React.ReactNode;
  className: string;
};

export default function CustomTooltip({ title, content, className }: Props) {
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <Billingover open={open} onOpenChange={setOpen}>
      <BillingoverTrigger>
        <PrimaryBtn
          className={className}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {title}
        </PrimaryBtn>
      </BillingoverTrigger>
      {open && (
        <BillingoverContent
          className="bg-purple-500 font-base font-normal font-jakarta text-white"onClick={handleButtonClick}
          align="end"
          side="top"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {content}
        </BillingoverContent>
      )}
    </Billingover>
  );
}

