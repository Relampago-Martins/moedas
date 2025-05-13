import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converte um número para o formato de moeda local (BRL)
 * ex: 1.000,00
 */
export function numberToCurrency(value: number | string) {
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

/**
 *
 * Converte uma data no yyyy-mm-dd para o formato local (dd MMM yyyy)
 * ex: 01 Jan 2022
 */
export function toLocalDate(date: string): string {
    const [year, monthIndex, day] = date.split('-').map(Number);

    const monthNames = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ];

    const month = monthNames[monthIndex - 1];

    return `${day} ${month} ${year}`;
}

/**
 * Formata uma data para o formato de tempo decorrido (há 1 minuto)
 * ex: 2024-09-09 -> há 1 minuto
 */
export const formatDateToTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};

/**
 * Converte um objeto em uma URLSearchParams.
 */
export function obj2SearchParams<T extends object>(obj: T) {
    const urlParams = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
        if (value === undefined) return;
        urlParams.append(key, value);
    });
    return urlParams;
}

/**
 * Recebe uma data no formato yyyy-mm-dd e retorna um objeto de data
 */
export function getDateFromISO(data: string | null) {
    if (!data) return new Date();

    const [year, month, day] = data.split('-').map(Number);
    return new Date(year, month - 1, day);
}
