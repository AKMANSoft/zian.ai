import { CalendarGridEl, CalendarHeader, CalendarPostEl } from "./calendar-view";
import { weekdayNamesShort, CalendarProps, formatNumberto0, monthNamesLong, getWeeksInMonth } from "./defaults";
import { cn } from "../../lib/utils";
import { useState } from "react";

type MonthCalendarProps = CalendarProps



export default function MonthCalendarView({ mode, onModeChange }: MonthCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState({
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear(),
        weeks: getWeeksInMonth(new Date())
    });

    const goToNextMonth = () => {
        const dateObj = new Date(currentMonth.year, currentMonth.month + 1);
        setCurrentMonth({
            month: dateObj.getMonth(),
            year: dateObj.getFullYear(),
            weeks: getWeeksInMonth(dateObj)
        })
    }

    const goToPrevMonth = () => {
        const dateObj = new Date(currentMonth.year, currentMonth.month - 1);
        setCurrentMonth({
            month: dateObj.getMonth(),
            year: dateObj.getFullYear(),
            weeks: getWeeksInMonth(dateObj)
        })
    }

    return (

        <div className='text-white h-full flex flex-col' >
            {/* Calendar Header  */}
            <CalendarHeader
                mode={mode}
                onModeChange={onModeChange}
                heading={monthNamesLong[currentMonth.month] + " " + currentMonth.year}
                onPrevClick={goToPrevMonth}
                onNextClick={goToNextMonth}
            />
            {/* Calendar Body */}
            {/* [&>*:nth-last-child(-n+7)]:border-b-0 */}
            <div className="h-full max-h-full overflow-y-auto">
                <div className='grid grid-cols-7 [&>*:nth-child(7n+7)]:border-r-0 [&>*:nth-last-child(-n+7)]:border-b-0'>
                    {
                        currentMonth.weeks
                            .map((week, wIndex) => (
                                <>
                                    {
                                        week.allDaysArr.map((date, index) => (
                                            <CalendarGridEl
                                                content={
                                                    <div className='w-full'>
                                                        <div className='text-center mb-2'>
                                                            {
                                                                wIndex === 0 &&
                                                                <p className={cn(
                                                                    'text-white font-semibold font-jakarta mb-2 uppercase',
                                                                    "text-[0px] first-letter:text-xs md:text-xs"
                                                                )}>
                                                                    {weekdayNamesShort[index]}
                                                                </p>
                                                            }

                                                            <span className='text-white/60 text-xs font-normal font-jakarta'>
                                                                {formatNumberto0(date.getDate())}
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
                                </>
                            ))
                    }
                </div>
            </div>
        </div >
    );
}
