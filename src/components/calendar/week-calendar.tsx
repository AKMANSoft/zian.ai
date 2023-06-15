import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { CalendarGridEl, CalendarHeader, CalendarPostEl } from "./calendar-view";
import { monthNamesShort, weekdayNamesShort, CalendarProps, formatNumberto0, getWeekAllDays, CalendarWeek } from "./defaults";





function getWeekFromDate(date: Date, reverse = false): CalendarWeek {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    currentDate.setDate(currentDate.getDate() + (reverse ? -1 : 1))

    while (currentDate.getDay() !== 0) {
        // Move back to the previous day if the 1st day is not a Sunday
        currentDate.setDate(reverse ? (currentDate.getDate() + 1) : (currentDate.getDate() - 1));
    }


    const weekDays = getWeekAllDays(currentDate, true, reverse);
    return {
        start: reverse ? weekDays[weekDays.length - 1] : currentDate,
        end: reverse ? currentDate : weekDays[weekDays.length - 1],
        allDaysArr: reverse ? weekDays.reverse() : weekDays
    };
}


export default function WeekCalendarView({ mode, onModeChange, onPostSelect }: CalendarProps) {
    const [windowWidth, setWindowWidth] = useState(-1);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        })
    }, [])

    const [currentWeek, setCurrentWeek] = useState(() => {
        return getWeekFromDate(new Date())
    });

    const goToNextWeek = () => {
        setCurrentWeek(getWeekFromDate(currentWeek.end))
    }

    const goToPrevWeek = () => {
        const date = new Date(currentWeek.start.getFullYear(), currentWeek.start.getMonth(), currentWeek.start.getDate());
        date.setDate(date.getDate() - 8)
        setCurrentWeek(getWeekFromDate(date))
    }


    return (
        <div className='text-white' >
            {/* Calendar Header  */}
            <CalendarHeader
                mode={mode}
                onModeChange={onModeChange}
                className="border-none"
                heading={`${monthNamesShort[currentWeek.start.getMonth()]} ${currentWeek.start.getDate()}-${monthNamesShort[currentWeek.end.getMonth()]} ${currentWeek.end.getDate()}, ${currentWeek.allDaysArr[3].getFullYear()}`}
                onPrevClick={goToPrevWeek}
                onNextClick={goToNextWeek}
            />
            {/* Calendar Body */}
            {/* [&>*:nth-last-child(-n+7)]:border-b-0 */}
            <div className={cn(
                'grid grid-cols-8 lg:grid-cols-7',
                'lg:[&>*:nth-child(7n+7)]:border-r-0 lg:[&>*:nth-last-child(-n+7)]:border-b-0',
                windowWidth <= 1000 && '[&>*:nth-child(8n+8)]:border-r-0 [&>*:nth-last-child(-n+8)]:border-b-0',
            )}>
                {
                    windowWidth <= 1000 &&
                    <CalendarGridEl
                        className={"border-b-primary min-h-0 py-5"}
                        content={
                            <div></div>
                        }
                    />
                }
                {
                    currentWeek.allDaysArr.map((day, index) => (
                        index < 7 &&
                        <CalendarGridEl
                            className={"border-b-primary min-h-0 py-5"}
                            content={
                                <div className='w-full flex items-center justify-center'>
                                    <div className='text-center mb-2'>
                                        <p className={cn(
                                            'text-white text-xs font-semibold font-jakarta mb-2 uppercase',
                                            "text-[0px] first-letter:text-xs md:text-xs"
                                        )}>
                                            {weekdayNamesShort[index]}
                                        </p>
                                        <span className='text-white/60 md:text-white text-xs md:text-2xl font-normal md:font-semibold font-jakarta'>
                                            {formatNumberto0(day.getDate())}
                                        </span>
                                    </div>
                                </div>
                            }
                        />
                    ))
                }
                {
                    ["08:00", "09:00", "10:00", "11:00", "12:00", "01:00", "02:00", "03:00"]
                        .map((hour, hIndex) => (
                            <>
                                {
                                    (
                                        windowWidth > 1000
                                            ? currentWeek.allDaysArr
                                            : [1, ...currentWeek.allDaysArr.map((d) => d.getDate() + 1)]
                                    )
                                        .map((_, dIndex) => (
                                            <CalendarGridEl
                                                className={cn(
                                                    (windowWidth <= 1000 && dIndex === 0) && "border-y-0"
                                                )}
                                                content={
                                                    <div className='w-full relative'>
                                                        {
                                                            ((windowWidth <= 1000) ? (dIndex % 8 === 0) : (dIndex % 7 === 0)) &&
                                                            <p className={cn(
                                                                'text-white/60 text-xs md:text-sm font-normal font-jakarta',
                                                                "absolute -top-6 left-3 md:lef1",
                                                                hIndex === 0 && "top-1"
                                                            )}>
                                                                {hour}
                                                            </p>
                                                        }
                                                        <div className='text-center space-y-1 mb-2'>
                                                            {
                                                                dIndex !== 0 && dIndex % 2 === 0 &&
                                                                <>
                                                                    <CalendarPostEl onClick={onPostSelect} />
                                                                    <CalendarPostEl onClick={onPostSelect} />
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        ))
                                }
                            </>
                        ))
                }
            </div>
        </div >
    );
}
