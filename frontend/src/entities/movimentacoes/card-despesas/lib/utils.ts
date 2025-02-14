
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