import { faChevronLeft, faChevronRight, faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { cn } from "../../lib/utils";
import SelectEl from "../ui/select";
import { CalendarGridEl } from "./calendar-view";
import { monthNamesLong, calendarViewModes, weekdayNamesShort, CalendarProps, formatNumberto0 } from "./defaults";




export default function WeekCalendarView({ mode, onModeChange }: CalendarProps) {
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
            <div className='flex items-center justify-between px-8 pt-7 pb-6' >
                <h4 className='inline-flex items-center gap-8 text-xl font-semibold font-jakarta'>
                    <span>
                        {monthNamesLong[currentWeek[0].getMonth()]}
                        <span className='mx-2'>
                            {`${currentWeek[0].getDate()}-${currentWeek[currentWeek.length - 1].getDate()},`}
                        </span>
                        {currentWeek[0].getFullYear()}
                    </span>
                    <span className='inline-flex items-center gap-1 text-xs'>
                        <button onClick={goToPrevWeek} className='p-2 cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={goToNextWeek} className='p-2 cursor-pointer'>
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
            <div className='grid grid-cols-7 [&>*:nth-child(7n+7)]:border-r-0 [&>*:nth-last-child(-n+7)]:border-b-0'>
                {
                    currentWeek.map((day, index) => (
                        index < 7 &&
                        <CalendarGridEl
                            className={"border-b-primary min-h-0 py-5"}
                            content={
                                <div className='w-full flex items-center justify-center'>
                                    <div className='text-center mb-2'>
                                        <p className='text-white text-sm font-normal font-jakarta mb-2 uppercase'>
                                            {weekdayNamesShort[index]}
                                        </p>
                                        <span className='text-white text-2xl font-semibold font-jakarta'>
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
                                    currentWeek.map((_, dIndex) => (
                                        <CalendarGridEl
                                            content={
                                                <div className='w-full relative'>
                                                    {
                                                        dIndex % 7 === 0 &&
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
