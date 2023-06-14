// import { Calendar } from "dayzed";
import { Option } from "../ui/selectel";

export const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monthNamesLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const weekdayNamesShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const calendarViewModes = [
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
];

export function formatNumberto0(num: number): string {
  return num >= 10 ? `${num}` : `0${num}`;
}

export type CalendarProps = {
  mode: Option;
  onModeChange: (mode: Option) => void;
};

export function generateMonthDatesArray(thisMonth: Date): number[] {
  const prevMonthLastDay = new Date(
    thisMonth.getFullYear(),
    thisMonth.getMonth(),
    0
  ).getDate();
  const thisMonthArr = Array.from(
    new Array((new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0)).getDate()),
    (_, i) => i + 1
  );
  const remDays = 42 - thisMonthArr.length;
  const prevMonthArr = [
    prevMonthLastDay - 3,
    prevMonthLastDay - 2,
    prevMonthLastDay - 1,
    prevMonthLastDay,
  ];
  const nextMonthArr = Array.from(Array(remDays - prevMonthArr.length).keys(), (_, k) => k + 1);
  return [...prevMonthArr, ...thisMonthArr, ...nextMonthArr];
}



export function getWeekAllDays(date: Date, inclusive = false, reverse = false) {
  return Array.from(Array(7).keys()).map((idx) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(((reverse ? -1 : 1) * idx) + d.getDate() + (inclusive ? 0 : 1));
    return d;
  })
}



export type CalendarWeek = {
  start: Date;
  end: Date;
  allDaysArr: Date[]
}



export function getWeeksInMonth(date: Date, allWeeks = true) {
  const weeksCount = allWeeks ? 6 : 1;
  const weeks: CalendarWeek[] = [];
  const currentDate = new Date(date.getFullYear(), date.getMonth(), allWeeks ? 1 : date.getDate());
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  while (currentDate.getDay() !== 0) {
    // Move back to the previous day if the 1st day is not a Sunday
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (currentDate <= lastDate || weeks.length < weeksCount) {
    const weekStart = new Date(currentDate);
    const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);


    weeks.push({
      start: weekStart,
      end: weekEnd,
      allDaysArr: getWeekAllDays(weekStart, true)
    });

    // Move to the next week
    currentDate.setDate(currentDate.getDate() + 7);
  }


  return weeks;
}


// export function generateMonthDatesArray(thisClndr: Calendar): number[] {
//   const prevMonthLastDay = new Date(
//     thisClndr.year,
//     thisClndr.month,
//     0
//   ).getDate();
//   const thisMonthArr = Array.from(
//     new Array(thisClndr.lastDayOfMonth.getDate()),
//     (_, i) => i + 1
//   );
//   const remDays = 42 - thisMonthArr.length;
//   const prevMonthArr = [
//     prevMonthLastDay - 3,
//     prevMonthLastDay - 2,
//     prevMonthLastDay - 1,
//     prevMonthLastDay,
//   ];
//   const nextMonthArr = [...Array(remDays - prevMonthArr.length).keys()];
//   return [...prevMonthArr, ...thisMonthArr, ...nextMonthArr];
// }
