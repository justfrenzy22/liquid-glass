import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Compose conditional classes and let the last conflicting Tailwind class win. */
export function cn(...values: ClassValue[]) {
  return twMerge(clsx(values));
}
