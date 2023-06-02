import { RenderProps } from "dayzed";
import { CalendarGridEl, CalendarHeader, CalendarPostEl } from "./calendar-view";
import { monthNamesShort, weekdayNamesShort, generateMonthDatesArray, CalendarProps, formatNumberto0 } from "./defaults";
import { cn } from "../../lib/utils";
import { useState } from "react";

type MonthCalendarProps = CalendarProps & RenderProps


export default function MonthCalendarView({ mode, onModeChange }: MonthCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState((new Date()));

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }

    const goToPrevMonth = () => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        setCurrentMonth(date);
    }
    return (

        <div className='text-white' >
            {/* Calendar Header  */}
            <CalendarHeader
                mode={mode}
                onModeChange={onModeChange}
                heading={monthNamesShort[currentMonth.getMonth()] + " " + currentMonth.getFullYear()}
                onPrevClick={goToPrevMonth}
                onNextClick={goToNextMonth}
            />
            {/* Calendar Body */}
            {/* [&>*:nth-last-child(-n+7)]:border-b-0 */}
            <div className='grid grid-cols-7 [&>*:nth-child(7n+7)]:border-r-0 [&>*:nth-last-child(-n+7)]:border-b-0'>
                {
                    generateMonthDatesArray(currentMonth)
                        .map((day, index) => (
                            <CalendarGridEl
                                content={
                                    <div className='w-full'>
                                        <div className='text-center mb-2'>
                                            {
                                                index < weekdayNamesShort.length &&
                                                <p className={cn(
                                                    'text-white font-semibold font-jakarta mb-2 uppercase',
                                                    "text-[0px] first-letter:text-xs md:text-xs"
                                                )}>
                                                    {weekdayNamesShort[index]}
                                                </p>
                                            }

                                            <span className='text-white/60 text-xs font-normal font-jakarta'>
                                                {formatNumberto0(day)}
                                            </span>
                                        </div>
                                        {
                                            index % 5 === 0 &&
                                            <CalendarPostEl />
                                        }
                                    </div>
                                }
                            />
                        ))
                }
            </div>
        </div >
    );
}
