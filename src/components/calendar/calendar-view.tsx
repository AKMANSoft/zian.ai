import { Props, useDayzed } from 'dayzed';
import { cn } from '../../lib/utils';
import { ReactNode, useState } from 'react';
import { calendarViewModes } from './defaults';
import WeekCalendarView from './week-calendar';
import MonthCalendarView from './month-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import DayCalendarView from './day-calendar';




type CalendarGridElProps = {
    content: ReactNode;
    className?: string;
}

export function CalendarGridEl({ content, className }: CalendarGridElProps) {
    return (
        <div className={cn(
            'w-full border-[0.5px] border-white/10 min-h-[130px]',
            "border-l-0 border-t-0 flex justify-center p-[10px]",
            className
        )}>
            {content}
        </div>
    );
}




export function CalendarPostEl() {
    return (
        <button className="w-full text-start cursor-pointer bg-radial-gr-purple rounded-md border h-auto border-primary/40 py-2 px-3">
            <h5 className="text-white text-xs font-bold font-jakarta line-clamp-1">
                <FontAwesomeIcon icon={faTwitter} className="mr-[3px]" />
                @moonlanding
            </h5>
            <p className="text-white/40 text-xs font-normal font-jakarta mt-2">
                9:30pm
                <br />
                <FontAwesomeIcon icon={faImage} className="mt-2 text-white/60" />
            </p>
        </button>
    );
}




export default function CalendarView(props: Omit<Props, "children" | "render">) {
    const dayzedData = useDayzed(props);
    const [calendarMode, setCalendarMode] = useState(calendarViewModes[0]);
    switch (calendarMode) {
        case calendarViewModes[1]:
            return <WeekCalendarView mode={calendarMode} onModeChange={setCalendarMode} />;
        case calendarViewModes[2]:
            return <DayCalendarView mode={calendarMode} onModeChange={setCalendarMode} />;
        case calendarViewModes[0]:
        default:
            return <MonthCalendarView {...dayzedData} mode={calendarMode} onModeChange={setCalendarMode} />;
    }
}



