import { faChevronLeft, faChevronRight, faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RenderProps } from "dayzed";
import SelectEl from "../ui/select";
import { CalendarGridEl, CalendarPostEl } from "./calendar-view";
import { monthNamesShort, calendarViewModes, weekdayNamesShort, generateMonthDatesArray, CalendarProps, formatNumberto0 } from "./defaults";

type MonthCalendarProps = CalendarProps & RenderProps


export default function MonthCalendarView({ calendars, getBackProps, getForwardProps, mode, onModeChange }: MonthCalendarProps) {
    if (calendars.length) {
        return (
            <>
                {
                    calendars.map((calendar) => (
                        <div className='text-white' >
                            {/* Calendar Header  */}
                            <div className='flex items-center justify-between border-b border-primary px-8 pt-7 pb-6' >
                                <h4 className='inline-flex items-center gap-8 text-xl font-semibold font-jakarta'>
                                    {monthNamesShort[calendar.month] + " " + calendar.year}
                                    <span className='inline-flex items-center gap-1 text-xs'>
                                        <button {...getBackProps({ calendars })} className='p-2 cursor-pointer'>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        <button {...getForwardProps({ calendars })} className='p-2 cursor-pointer'>
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
                                    generateMonthDatesArray(
                                        calendar,
                                    )
                                        .map((day, index) => (
                                            <CalendarGridEl
                                                content={
                                                    <div className='w-full'>
                                                        <div className='text-center mb-2'>
                                                            {
                                                                index < weekdayNamesShort.length &&
                                                                <p className='text-white text-sm font-normal font-jakarta mb-2 uppercase'>
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
                    ))
                }
            </>
        );
    }
    return null;
}
