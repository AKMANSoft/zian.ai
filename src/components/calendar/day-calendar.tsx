import { useState } from "react";
import { cn } from "../../lib/utils";
import { weekdayNamesShort, CalendarProps, formatNumberto0, monthNamesShort } from "./defaults";
import { CalendarHeader } from "./calendar-view";
import { ScheduleListItem } from "../postview-section";




export default function DayCalendarView({ mode, onModeChange, onPostSelect }: CalendarProps) {
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
            <CalendarHeader
                mode={mode}
                onModeChange={onModeChange}
                className="border-none"
                heading={`${monthNamesShort[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
                onPrevClick={goToPrevDay}
                onNextClick={goToNextDay}
            />
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
                                <HourRowEl onItemClick={onPostSelect} text={hour} />
                            ))
                    }
                </div>
            </div>
        </div >
    );
}



type HourRowElProps = {
    text: string;
    onItemClick?: () => void;
}


function HourRowEl({ text, onItemClick }: HourRowElProps) {
    return (
        <ScheduleListItem
            className="bg-transparent border-b-[0.5px] border-white/10 last:border-none px-3 pt-3 pb-5 place-items-start !rounded-none"
            onItemClick={onItemClick}
            leading={
                <p className={cn(
                    'text-white/60 text-sm font-normal font-jakarta w-[55px] overflow-hidden',
                )}>
                    {text}
                </p>
            }
        />
        // <div className={cn(
        //     "w-full border-b-[0.5px] border-white/10 last:border-none px-3 pt-3 pb-5",
        //     "flex items-start gap-3"
        // )}>
        //     <p className={cn(
        //         'text-white/60 text-sm font-normal font-jakarta w-[55px] overflow-hidden',
        //     )}>
        //         {text}
        //     </p>
        //     <div className="inline-flex items-center gap-3">
        //         <PrimaryBtnNeon className="text-base text-th-gray">
        //             <FontAwesomeIcon icon={faTwitter} />
        //             @moonlanding.media
        //         </PrimaryBtnNeon>
        //         <PrimaryBtnNeon className="text-base text-th-gray">
        //             <FontAwesomeIcon icon={faFacebook} />
        //             @moonlanding.media
        //         </PrimaryBtnNeon>
        //         <PrimaryBtnNeon className="text-base text-th-gray">
        //             +1
        //         </PrimaryBtnNeon>
        //     </div>
        // </div>
    );
}
