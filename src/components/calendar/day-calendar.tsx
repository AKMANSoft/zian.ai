import { useState, useContext } from "react";
import { cn } from "../../lib/utils";
import { weekdayNamesShort, CalendarProps, formatNumberto0, monthNamesShort } from "./defaults";
import { CalendarHeader } from "./calendar-view";
import { ScheduleListItem } from "../postview-section";
import { changeImageUrl, sortScheduledContents } from '@/lib/utils'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import {
  scheduledContentsContext,
} from '@/App'




export default function DayCalendarView({ mode, onModeChange, onPostSelect }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const {scheduleContents, setScheduleContents, deleteNumber, setDeleteNumber, setContent}: any = useContext(scheduledContentsContext);

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

    function getHourSchedules(date: Date | null, hour: string) {
      if (! date) {
        return [];
      }

      const dateStr = date.toLocaleDateString();
      // console.log(`dateStr: ${dateStr}`);

      // const timeContentMap = scheduleMap.get(dateStr);
      const timeContentMap = sortScheduledContents(scheduleContents, false, true).get(dateStr);
      // console.log('timeContentMap', timeContentMap);
      if (timeContentMap) {
        // console.log(`timeContentMap for date(${dateStr}):`);
        // console.log(timeContentMap);
        for (let entry of timeContentMap) {
          // console.log(`time: ${entry[0]}`);
          if (hour === entry[0]) {
            console.log(`contents for date(${dateStr}):`);
            console.log(entry[1]);
            return entry[1];
          }
        }
      }
      return [];
    }

    function getItems(date: Date, hour: string) {
      const contents = getHourSchedules(date, hour);

      if (contents) {
        let items = [];
        for (let content of contents) {
          items.push({
            // text: content.text,
            text: content.twitterUsername,
            icon: faTwitter,
            content: content,
          });
        }
        return items;
      } else {
        return []
      }
    }


    return (
        <div className='text-white h-full flex flex-col' >
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
            {/*<div className=''>*/}
            <div className="h-full max-h-full overflow-y-auto">
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
                        // ["08:00", "09:00", "10:00", "11:00", "12:00", "01:00", "02:00", "03:00"]
                        ["08:00", "09:00", "10:00", "11:00", "12:00", '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
                          '21:00', '22:00', '23:00', '00:00', "01:00", "02:00", "03:00", '04:00', '05:00', '06:00', '07:00']
                            .map((hour) => (
                                // <HourRowEl onItemClick={onPostSelect} text={hour} />
                                <HourRowEl key={hour} onItemClick={onPostSelect} text={hour}
                                  deleteNumber={deleteNumber}
                                  setDeleteNumber={setDeleteNumber}
                                  items={getItems(currentDate, hour)}
                                  setContent={setContent}
                                />
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
    deleteNumber?: number
    setDeleteNumber?: any
    items?: any
    setContent?: (content: any) => void
}


function HourRowEl({ text, onItemClick, deleteNumber, setDeleteNumber, items, setContent }: HourRowElProps) {
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
          items={items}
          deleteNumber={deleteNumber}
          setDeleteNumber={setDeleteNumber}
          setContent={setContent}
          hasClickBtn={true}
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
