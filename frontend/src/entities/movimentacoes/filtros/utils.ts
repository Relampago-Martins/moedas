
/**
 * @param monthIndex Recebe um número correspondente a um mês
 * @returns Um objeto com as datas de início e fim do mês
 */
export const getMonthRange = (monthIndex: number, year: number) => {
    const date = new Date();
    date.setMonth(monthIndex);
    date.setFullYear(year);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    
    const firstDay = new Date(date);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    return {
        start: firstDay.toISOString().split('T')[0],
        end: lastDay.toISOString().split('T')[0]
    };
};

/**
 * Recebe uma data no formato yyyy-mm-dd e retorna um objeto de data
 */
export function getMesSelecionado(data: string | null) {
    if (!data) return new Date();
    
    const [year, month, day] = data.split('-').map(Number);
    return new Date(year, month - 1, day);

}

export const getDefaultChartData = (data?: string) => {
    if (!data) return [];
    
    const [year, month, day] = data.split('-').map(Number);
    const date = new Date();
    date.setMonth(month - 1);
    date.setFullYear(year);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    
    const firstDay = new Date(date);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [
        {
            date: firstDay.getTime(),
            value: 0
        },
        {
            date: lastDay.getTime(),
            value: 0
        }
    ]
}