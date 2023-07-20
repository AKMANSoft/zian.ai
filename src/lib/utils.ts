import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function b64Image(image: string) {
  return `data:image/png;base64,${image}`
}


export function formatNumberto0(num: number): string {
  return num >= 10 ? `${num}` : `0${num}`;
}