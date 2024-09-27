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

export function toLocalDate(date: Date): string {
  const day = date.getDate();
  const monthIndex = date.getMonth(); // Month index (0-11)
  const year = date.getFullYear();

  const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const month = monthNames[monthIndex];

  return `${day} ${month} ${year}`;
}
