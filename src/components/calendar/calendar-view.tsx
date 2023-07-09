/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '../../lib/utils';
import { ReactNode, useState } from 'react';
import { calendarViewModes } from './defaults';
import WeekCalendarView from './week-calendar';
import MonthCalendarView from './month-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import DayCalendarView from './day-calendar';
import SelectEl from '../ui/selectel';
import { faCalendar, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CalendarProps } from './defaults';





type CalendarHeaderProps = CalendarProps & {
    className?: string;
    heading: string;
    backProps?: Record<string, any>;
    forwardProps?: Record<string, any>;
    onPrevClick: () => void;
    onNextClick: () => void;
}


export function CalendarHeader({
    className, heading,
    onPrevClick, onNextClick,
    mode, onModeChange
}: CalendarHeaderProps) {
    return (
        <div className={cn(
            "border-b border-primary px-5 md:px-8 pt-7 pb-6",
            className
        )}>
            <div className='flex items-center justify-between' >
                <h4 className='inline-flex items-center gap-8 text-xl font-semibold font-jakarta'>
                    {heading}
                    <span className='inline-flex items-center gap-1 text-xs'>
                        <button onClick={onPrevClick} className='p-2 cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={onNextClick} className='p-2 cursor-pointer'>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </span>
                    <FontAwesomeIcon icon={faCalendar} />
                </h4>
                <div className='inline-flex items-center md:gap-6'>
                    <button className='w-7 h-auto px-1 text-sm text-white font-semibold aspect-square rounded-full border-2 border-white'>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <SelectEl
                        className='py-2 rounded-[4px] hidden md:flex'
                        optClassName='py-2'
                        optContainerClassName='rounded'
                        options={calendarViewModes}
                        value={mode}
                        onValueChange={onModeChange}
                    />
                </div>
            </div>
            <SelectEl
                className='py-3 rounded-[4px] md:hidden mt-5'
                optClassName='py-3'
                optContainerClassName='rounded'
                options={calendarViewModes}
                value={mode}
                onValueChange={onModeChange}
            />
        </div>
    )
}







type CalendarGridElProps = {
    content: ReactNode;
    className?: string;
}

export function CalendarGridEl({ content, className }: CalendarGridElProps) {
    return (
        <div className={cn(
            'w-full border-[0.5px] border-white/10 min-h-[130px]',
            "border-l-0 border-t-0 flex justify-center px-0 py-[10px] md:p-[10px]",
            className
        )}>
            {content}
        </div>
    );
}


type CalendarPostElProps = {
    onlyIcon?: boolean;
    onClick?: () => void;
    contentEntry?: any
    setContent?: any
}


export function CalendarPostEl({ onlyIcon, onClick, contentEntry, setContent }: CalendarPostElProps) {
    function onClickCalendarGrid() {
      setContent(contentEntry?.content);
      // onClick && onClick();
    }

    return (
        contentEntry &&
        <button type='button' onClick={onClickCalendarGrid} className={cn(
            "w-full text-start cursor-pointer bg-radial-gr-purple rounded-md border h-auto border-primary/40",
            "py-1 xl:py-2 px-[10px] xl:px-3"
        )}>
            <span className='block xl:hidden text-center text-[10px]'>
                <FontAwesomeIcon icon={faTwitter} />
            </span>

            {
                !onlyIcon &&
                  <>
                      <h5 className={cn(
                          "text-white text-xs font-bold font-jakarta items-center gap-1",
                          "hidden xl:inline-flex"
                      )}>
                          <FontAwesomeIcon icon={faTwitter} />
                          <span className={cn(
                              "max-w-[35px] xl:max-w-[45px] 2xl:max-w-[50%] 3xl:max-w-[200px] overflow-hidden text-ellipsis line-clamp-1",
                          )}>
                            { contentEntry?.content?.twitterUsername }
                          </span>
                      </h5>
                      <p className={cn(
                          "text-white text-xs font-normal font-jakarta mt-[6px]",
                          "hidden xl:block",
                      )}>
                        {/*9:30pm*/}
                        {contentEntry?.time}
                      </p>
                  </>
            }
        </button>
    );
}




type CalendarViewProps = {
    onPostSelect?: () => void
    // calendarMode: { text: string, value: string, disabled: boolean },
    // setCalendarMode: (e: any) => void
}

// export default function CalendarView({ onPostSelect, calendarMode, setCalendarMode }: CalendarViewProps) {
export default function CalendarView({ onPostSelect }: CalendarViewProps) {
    const [calendarMode, setCalendarMode] = useState(calendarViewModes[0]);
    switch (calendarMode) {
        case calendarViewModes[1]:
            return <WeekCalendarView mode={calendarMode} onPostSelect={onPostSelect} onModeChange={setCalendarMode} />;
        case calendarViewModes[2]:
            return <DayCalendarView mode={calendarMode} onPostSelect={onPostSelect} onModeChange={setCalendarMode} />;
        case calendarViewModes[0]:
        default:
            return <MonthCalendarView mode={calendarMode} onPostSelect={onPostSelect} onModeChange={setCalendarMode} />;
    }
}



