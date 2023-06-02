import { Calendar } from "dayzed";
import { Option } from "../ui/select";

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
  return num > 10 ? `${num}` : `0${num}`;
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
  const nextMonthArr = [...Array(remDays - prevMonthArr.length).keys()];
  return [...prevMonthArr, ...thisMonthArr, ...nextMonthArr];
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
