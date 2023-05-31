import { faCalendar, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar, Props, RenderProps, useDayzed } from 'dayzed';
import SelectEl from './ui/select';
import { cn } from '../lib/utils';
import { ReactNode } from 'react';
import { CalendarPostEl } from './postview-section';

const monthNamesShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



function generateMonthDatesArray(thisClndr: Calendar): number[] {
    const prevMonthLastDay = new Date(thisClndr.year, thisClndr.month, 0).getDate();
    const thisMonthArr = Array.from(new Array(thisClndr.lastDayOfMonth.getDate()), (_, i) => i + 1)
    const remDays = 42 - thisMonthArr.length;
    const prevMonthArr = [
        prevMonthLastDay - 3,
        prevMonthLastDay - 2,
        prevMonthLastDay - 1,
        prevMonthLastDay
    ]
    const nextMonthArr = [...Array(remDays - prevMonthArr.length).keys()]
    return [...prevMonthArr, ...thisMonthArr, ...nextMonthArr]
}



// function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }: RenderProps) {
function Calendar({ calendars, getBackProps, getForwardProps }: RenderProps) {
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
                                        options={[
                                            {
                                                text: "Month",
                                                value: "month",
                                                disabled: false,
                                            },
                                            {
                                                text: "Week",
                                                value: "week",
                                                disabled: false,
                                            },
                                            {
                                                text: "Day",
                                                value: "day",
                                                disabled: false,
                                            },
                                        ]}
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
                                                                <p className='text-white text-sm font-normal font-jakarta mb-2'>
                                                                    {weekdayNamesShort[index]}
                                                                </p>
                                                            }

                                                            <span className='text-white/60 text-xs font-normal font-jakarta'>
                                                                {day}
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
            // <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            //     <div>
            //         <button {...getBackProps({ calendars })}>Back</button>
            //         <button {...getForwardProps({ calendars })}>Next</button>
            //     </div>
            //     {calendars.map(calendar => (
            //         <div
            //             key={`${calendar.month}${calendar.year}`}
            //             style={{
            //                 display: 'inline-block',
            //                 width: '50%',
            //                 padding: '0 10px 30px',
            //                 boxSizing: 'border-box'
            //             }}
            //         >
            //             <div>
            //                 {monthNamesShort[calendar.month]} {calendar.year}
            //             </div>
            //             {weekdayNamesShort.map(weekday => (
            //                 <div
            //                     key={`${calendar.month}${calendar.year}${weekday}`}
            //                     style={{
            //                         display: 'inline-block',
            //                         width: 'calc(100% / 7)',
            //                         border: 'none',
            //                         background: 'transparent'
            //                     }}
            //                 >
            //                     {weekday}
            //                 </div>
            //             ))}
            //             {calendar.weeks.map((week, weekIndex) =>
            //                 week.map((dateObj, index) => {
            //                     const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
            //                     if (!dateObj) {
            //                         return (
            //                             <div
            //                                 key={key}
            //                                 style={{
            //                                     display: 'inline-block',
            //                                     width: 'calc(100% / 7)',
            //                                     border: 'none',
            //                                     background: 'transparent'
            //                                 }}
            //                             />
            //                         );
            //                     }
            //                     const { date, selected, selectable, today } = dateObj;
            //                     let background = today ? 'cornflowerblue' : '';
            //                     background = selected ? 'purple' : background;
            //                     background = !selectable ? 'teal' : background;
            //                     return (
            //                         <button
            //                             style={{
            //                                 display: 'inline-block',
            //                                 width: 'calc(100% / 7)',
            //                                 border: 'none',
            //                                 background
            //                             }}
            //                             key={key}
            //                             {...getDateProps({ dateObj })}
            //                         >
            //                             {selectable ? date.getDate() : 'X'}
            //                         </button>
            //                     );
            //                 })
            //             )}
            //         </div>
            //     ))}
            // </div>
        );
    }
    return null;
}




type CalendarGridElProps = {
    content: ReactNode;
}

function CalendarGridEl({ content }: CalendarGridElProps) {
    return (
        <div className={cn(
            'w-full border-[0.5px] border-white/10 min-h-[130px]',
            "border-l-0 border-t-0 flex justify-center p-[10px]"
        )}>
            {content}
        </div>
    );
}



export function Datepicker(props: Omit<Props, "children" | "render">) {
    const dayzedData = useDayzed(props);
    return <Calendar {...dayzedData} />;
}

// class Single extends React.Component {
//     state = { selectedDate: null };

//     _handleOnDateSelected = ({ selected, selectable, date }: never) => {
//         this.setState(state => ({ selectedDate: date }));
//     };

//     render() {
//         const { selectedDate } = this.state;
//         return (
//             <div>
//                 <Datepicker
//                     selected={this.state.selectedDate}
//                     onDateSelected={this._handleOnDateSelected}
//                 />
//                 {this.state.selectedDate && (
//                     <div style={{ paddingTop: 20, textAlign: 'center' }}>
//                         <p>Selected:</p>
//                         <p>{`${selectedDate.toLocaleDateString()}`}</p>
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }

