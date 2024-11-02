/**
 * Recebe um mes e um ano e retorna o mes e ano seguinte
 */
export function incrementMonth(mes: number, ano: number, increment: number) {
    const date = new Date(ano, mes);
    date.setMonth(date.getMonth() + increment);
    return { mes: date.getMonth(), ano: date.getFullYear() };
}

/**
 * Recebe um mes e um ano e retorna a data no formato 'Mes Ano'
 * ex: 11, 2022 => Novembro 2022
 */
export function date2MesAno(mes: number, ano: number): string {
    const date = new Date(ano, mes);
    const str = date.toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric',
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
}
