import * as React from "react"
import { cn } from "@/lib/utils"
import { PrimaryBtnNeon } from "./buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { IconDefinition, faCalendar, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Calendar } from "./calendar"
import { SelectSingleEventHandler } from "react-day-picker"
import { twitterUserContext } from "@/App"
import { useContext } from 'react';


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
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  labelNode?: React.ReactNode
  placeholder?: string;
  id?: string;
  endIcon?: IconDefinition;
  value?: string;
  onChange?: (value: string) => void
}

// function InputEl({ label, placeholder = "", labelNode = null, id = "", endIcon, type = "text", value, onChange, className }: InputElProps) {
const InputEl = React.forwardRef(({ label, placeholder = "", labelNode = null, id = "", endIcon, type = "text", value, onChange, className }: InputElProps, ref: any) => {

  return (
    <div className={cn(
      "w-full relative",
      className,
    )}>
      {
        labelNode !== null ?
          labelNode
          :
          <label htmlFor={id} className={cn(
            "text-sm font-semibold font-jakarta text-white"
          )}>
            {label}
          </label>
      }
      <input type={type} id={id} placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.call(null, e.target.value)}
        className={cn(
          "text-white text-start font-jakarta font-semibold text-sm leading-6 py-3 px-5",
          "border border-white/10 appearance-none rounded-10 w-full bg-transparent mt-2",
          "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70"
        )}
      ref={ref}
      />
      {
        endIcon && endIcon !== null &&
        <span className="h-16 absolute z-10 top-0 flex items-center justify-center right-4 text-white text-lg">
          <FontAwesomeIcon icon={endIcon} />
        </span>
      }
    </div>
  )
});




type InputElDateProps = {
  className?: string;
}

function InputElDate({ className }: InputElDateProps) {
  const [date, setDate] = React.useState(new Date());


  const onChange: SelectSingleEventHandler = (_, selectedDay) => {
    setDate(selectedDay);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={cn(
          "outline-none bg-transparent w-full",
          className
        )}>
          <InputEl type="button"
            value={date.toDateString()}
            placeholder="Choose date" endIcon={faCalendar} />
        </button>

      </PopoverTrigger>
      <PopoverContent className="w-auto z-50 p-0 border-primary/30 text-white bg-gr-purple-dark backdrop-blur" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          // disabled={(d) =>
          //   d > new Date() || date < new Date("1900-01-01")
          // }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}





type InputElWChipsProps = {
  label?: string;
  labelNode?: React.ReactNode
  placeholder?: string;
  id?: string;
}

function InputElWChips({ label, placeholder = "", labelNode = null, id = "" }: InputElWChipsProps) {
  const [inputVal, setInputVal] = React.useState("");
  const twitterUsersList: any = useContext(twitterUserContext);
  // console.log('InputElWChips');
  // console.log(twitterUsersList);
  const realTwitterUsersList: string[] = twitterUsersList && twitterUsersList?.results?.map((e: any) => e.username);

  // const [chips, setChips] = React.useState(["Twitter"]);
  const [chips, setChips] = React.useState(realTwitterUsersList);

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setChips([...chips, inputVal]);
      setInputVal("");
    }
  }

  const removeChip = (chip: string) => {
    setChips(chips.filter((ch) => ch !== chip));
  }

  return (
    <div className="w-full">
      {
        labelNode !== null ?
          labelNode
          :
          <label htmlFor={id} className={cn(
            "text-base leading-7 block w-full font-semibold font-jakarta text-white"
          )}>
            {label}
          </label>
      }
      <div className={cn(
        "grid sm:grid-cols-2 lg:grid-cols-3 px-2 py-2 gap-2 min-h-[56px]",
        "border border-white/10 rounded-10 w-full bg-transparent mt-2",
        "focus-within:bg-th-gray/10"
      )}>
        {
          chips.map((chip) => (
            <PrimaryBtnNeon key={chip} className="text-[15px] font-medium w-full cursor-default">
              <FontAwesomeIcon icon={faTwitter} />
              <span className="block max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                {chip}
              </span>
              {/*
              <span onClick={() => removeChip(chip)} className="block z-[1] ms-auto w-auto h-full aspect-square cursor-pointer text-base ">
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
                */}
            </PrimaryBtnNeon>
          ))
        }
        {/*
        <input type="text" id={id}
          value={inputVal} onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress} placeholder={placeholder}
          className={cn(
            "text-white h-10 text-start bg-transparent font-jakarta font-normal text-sm leading-6 w-full px-2",
            "outline-none transition-all placeholder:text-white/70"
          )} />
          */}
      </div>
    </div>
  )
}


export { Input, InputEl, InputElWChips, InputElDate }



