import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberToCurrency(value: number | string) {
  if (typeof value === 'string') {
      value = parseFloat(value);
  }
  return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
  });
}
