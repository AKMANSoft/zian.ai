import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { CalendarGridEl, CalendarHeader } from "./calendar-view";
import { monthNamesLong, weekdayNamesShort, CalendarProps, formatNumberto0 } from "./defaults";




export default function WeekCalendarView({ mode, onModeChange }: CalendarProps) {
    const [windowWidth, setWindowWidth] = useState(-1);


    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        })
    }, [])

    const [currentWeek, setCurrentWeek] = useState(() => {
        return Array.from(Array(7).keys())
            .map((idx) => {
                const d = new Date();
                d.setDate(d.getDate() - d.getDay() + idx);
                return d;
            });
    });

    const goToNextWeek = () => {
        const currentWeekLastDate = currentWeek[currentWeek.length - 1]
        const nextWeek = Array.from(Array(7).keys())
            .map((idx) => {
                const d = new Date(currentWeekLastDate.getFullYear(), currentWeekLastDate.getMonth(), currentWeekLastDate.getDate() + 1);
                d.setDate(d.getDate() - d.getDay() + idx);
                return d;
            });
        setCurrentWeek(nextWeek);
    }

    const goToPrevWeek = () => {
        const currentWeekLastDate = currentWeek[currentWeek.length - 1]
        const nextWeek = Array.from(Array(7).keys())
            .map((idx) => {
                const d = new Date(currentWeekLastDate.getFullYear(), currentWeekLastDate.getMonth(), currentWeekLastDate.getDate() - 1);
                d.setDate(d.getDate() - d.getDay() - idx);
                return d;
            });
        setCurrentWeek(nextWeek);
    }


    return (
        <div className='text-white' >
            {/* Calendar Header  */}
            <CalendarHeader
                mode={mode}
                onModeChange={onModeChange}
                className="border-none"
                heading={`${monthNamesLong[currentWeek[0].getMonth()]} ${currentWeek[0].getDate()}-${currentWeek[currentWeek.length - 1].getDate()}, ${currentWeek[0].getFullYear()}`}
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
                    currentWeek.map((day, index) => (
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
                        .map((hour) => (
                            <>
                                {
                                    (
                                        windowWidth > 1000
                                            ? currentWeek
                                            : [1, ...currentWeek.map((d) => d.getDate() + 1)]
                                    )
                                        .map((_, dIndex) => (
                                            <CalendarGridEl
                                                content={
                                                    <div className='w-full relative'>
                                                        {
                                                            ((typeof window !== undefined && window.innerWidth <= 1000) ? dIndex % 8 === 0 : dIndex % 7 === 0) &&
                                                            <p className={cn(
                                                                'text-white/60 text-sm font-normal font-jakarta',
                                                                "absolute top-1 left-1"
                                                            )}>
                                                                {hour}
                                                            </p>
                                                        }
                                                        <div className='text-center mb-2'>

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
