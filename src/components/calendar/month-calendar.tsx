import { CalendarGridEl, CalendarHeader, CalendarPostEl } from "./calendar-view";
import { weekdayNamesShort, CalendarProps, formatNumberto0, monthNamesLong, getWeeksInMonth } from "./defaults";
import { cn } from "../../lib/utils";
import { useState, useContext } from "react";
import { changeImageUrl, sortScheduledContents } from '@/lib/utils'

import {
  scheduledContentsContext,
} from '@/App'

type MonthCalendarProps = CalendarProps



export default function MonthCalendarView({ mode, onModeChange, onPostSelect }: MonthCalendarProps) {
    const {scheduleContents, setScheduleContents, deleteNumber, setDeleteNumber, setContent}: any = useContext(scheduledContentsContext);

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

    function getFirstSchedule(date: Date) {
      let schedule:any = {};
      const dateStr = date.toLocaleDateString();
      // console.log(`dateStr: ${dateStr}`);

      // const timeContentMap = scheduleMap.get(dateStr);
      // console.log('getFirstSchedule', scheduleContents);
      const timeContentMap = sortScheduledContents(scheduleContents).get(dateStr);
      // console.log('timeContentMap', timeContentMap);
      if (timeContentMap) {
        // console.log(`timeContentMap for date(${dateStr}):`);
        // console.log(timeContentMap);
        for (let entry of timeContentMap) {
          // console.log(`time: ${entry[0]}`);
          schedule.time = entry[0];
          schedule.content = entry[1][0];
          // break;
          // console.log('schedule:');
          // console.log(schedule);
          return schedule
        }
        // console.log('schedule:');
        // console.log(schedule);
      }
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
                                                            { // show week flag on calendar first row
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
                                                        { // show content on some date grid
                                                            // index % 5 === 0 &&
                                                            <CalendarPostEl key={date.toLocaleDateString()} onClick={onPostSelect}
                                                              contentEntry={getFirstSchedule(date)}
                                                              setContent={setContent}
                                                            />
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
