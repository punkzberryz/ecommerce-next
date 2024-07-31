import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(delayInms: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
}
