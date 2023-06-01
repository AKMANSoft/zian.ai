import { faChevronLeft, faChevronRight, faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { cn } from "../../lib/utils";
import SelectEl from "../ui/select";
import { monthNamesLong, calendarViewModes, weekdayNamesShort, CalendarProps, formatNumberto0 } from "./defaults";
import { PrimaryBtnNeon } from "../ui/buttons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";




export default function DayCalendarView({ mode, onModeChange }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const goToNextDay = () => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        date.setDate(date.getDate() + 1);
        setCurrentDate(date);
    }

    const goToPrevDay = () => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        date.setDate(date.getDate() - 1);
        setCurrentDate(date);
    }


    return (
        <div className='text-white' >
            {/* Calendar Header  */}
            <div className='flex items-center justify-between border-b border-primary px-8 pt-7 pb-6' >
                <h4 className='inline-flex items-center gap-8 text-xl font-semibold font-jakarta'>
                    <span>
                        {monthNamesLong[currentDate.getMonth()]}
                        <span className='mx-2'>
                            {`${currentDate.getDate()},`}
                        </span>
                        {currentDate.getFullYear()}
                    </span>
                    <span className='inline-flex items-center gap-1 text-xs'>
                        <button onClick={goToPrevDay} className='p-2 cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={goToNextDay} className='p-2 cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </span>
                    <FontAwesomeIcon icon={faCalendar} />
                </h4>
                <div className='inline-flex items-center gap-6'>
                    <button className='w-7 h-auto px-1 text-sm text-white font-semibold aspect-square rounded-full border-2 border-white'>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <SelectEl
                        className='py-2 rounded'
                        optClassName='py-2'
                        optContainerClassName='rounded'
                        options={calendarViewModes}
                        value={mode}
                        onValueChange={onModeChange}
                    />
                </div>
            </div>
            {/* Calendar Body */}
            {/* [&>*:nth-last-child(-n+7)]:border-b-0 */}
            <div className=''>
                <div className="w-full border-b-[0.5px] border-white/10 px-8 py-4">
                    <div className={cn(
                        "block aspect-square rounded-full bg-primary px-4 py-2 w-[70px] h-[70px]",
                        "flex flex-col items-center justify-center text-center"
                    )}>
                        <p className="text-xs font-normal font-jakarta text-white uppercase">
                            {weekdayNamesShort[currentDate.getDay()]}
                        </p>
                        <p className="text-2xl font-bold font-jakarta text-white">
                            {formatNumberto0(currentDate.getDate())}
                        </p>
                    </div>
                </div>
                <div>
                    {
                        ["08:00", "09:00", "10:00", "11:00", "12:00", "01:00", "02:00", "03:00"]
                            .map((hour) => (
                                <HourRowEl text={hour} />
                            ))
                    }
                </div>
            </div>
        </div >
    );
}



type HourRowElProps = {
    text: string;
}


function HourRowEl({ text }: HourRowElProps) {
    return (
        <div className={cn(
            "w-full border-b-[0.5px] border-white/10 last:border-none px-3 pt-3 pb-5",
            "flex items-start gap-3"
        )}>
            <p className={cn(
                'text-white/60 text-sm font-normal font-jakarta w-[55px] overflow-hidden',
            )}>
                {text}
            </p>
            <div className="inline-flex items-center gap-3">
                <PrimaryBtnNeon className="text-base text-th-gray">
                    <FontAwesomeIcon icon={faTwitter} />
                    @moonlanding.media
                </PrimaryBtnNeon>
                <PrimaryBtnNeon className="text-base text-th-gray">
                    <FontAwesomeIcon icon={faFacebook} />
                    @moonlanding.media
                </PrimaryBtnNeon>
            </div>
        </div>
    );
}
