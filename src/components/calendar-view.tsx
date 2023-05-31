import { faCalendar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Props, RenderProps, useDayzed } from 'dayzed';

// const monthNamesShort = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec'
// ];
// const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }: RenderProps) {
function Calendar({ calendars }: RenderProps) {
    if (calendars.length) {
        return (
            <div className='text-white'>
                <div className='flex items-center justify-between'>
                    <h4 className='inline-flex items-center gap-8 text-xl font-semibold font-jakarta'>
                        April 2022
                        <span className='inline-flex items-center gap-4 text-xs'>
                            <FontAwesomeIcon icon={faChevronLeft} className='cursor-pointer' />
                            <FontAwesomeIcon icon={faChevronRight} className='cursor-pointer' />
                        </span>
                        <FontAwesomeIcon icon={faCalendar} />
                    </h4>
                </div>

            </div>
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

