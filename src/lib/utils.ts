import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(name: string) {
  return new URL(`/image/${name}.png`, import.meta.url).href
}

export function changeImageUrl(name: string, prefix: string = '/static') {
    if (import.meta.env.MODE == 'production') {
        return `${prefix}${name}`
    }
    return name
}

export function formatDate(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  // let strTime = hours + ':' + minutes + ' ' + ampm;
  let strTime = `${hours}:${strMinutes} ${ampm}`

  return strTime
}

export function sortScheduledContents(scheduledContents: any, useCreatedTime: boolean = false) {
  let result = new Map();
  for (const content of scheduledContents) {
    let date: string, time: string;
    if (useCreatedTime) {
      date = content.createdTime.toLocaleDateString();
      // const time = content.createdTime.toLocaleTimeString();
      time = formatDate(content.createdTime);
    } else {
      // console.log(content.scheduleTime);
      date = content.scheduleTime.toLocaleDateString();
      // const time = content.scheduleTime.toLocaleTimeString();
      time = formatDate(content.scheduleTime);
    }

    if (result.has(date)) {
      let e = result.get(date);
      if (e.has(time)) {
        e.get(time).push(content);
      } else {
        e.set(time, [content]);
      }
    } else {
      let v = new Map();
      v.set(time, [content]);
      result.set(date, v);
    }
  }
  return result;
}
