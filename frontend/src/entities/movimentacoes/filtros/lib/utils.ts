
/**
 * @param date Recebe um objeto Date
 * @returns Um objeto com as datas de início e fim do mês do objeto Date recebido
 */
export const getMonthRange = (date: Date) => {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    
    const firstDay = new Date(date);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return {
        after: firstDay,
        before: lastDay
    };
};

/**
 * Recebe uma data no formato yyyy-mm-dd e retorna um objeto de data
 */
export function getDateFomISO(data: string | null) {
    if (!data) return new Date();
    
    const [year, month, day] = data.split('-').map(Number);
    return new Date(year, month - 1, day);

}


/**
 * Recebe um objeto Date e retorna um nome verboso para o mes e ano
 */
export function formatDate(date: Date) {
    const monthStr = date.toLocaleDateString('pt-BR',  { month: 'long'});
    const year = date.getFullYear();
    return `${monthStr.charAt(0).toUpperCase()}${monthStr.slice(1)} ${year}`;
}