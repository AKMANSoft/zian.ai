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
