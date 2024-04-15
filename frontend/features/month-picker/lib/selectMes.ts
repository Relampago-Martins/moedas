export const mesOptions = [
    { value: 0, label: 'Janeiro', abrev: 'Jan' },
    { value: 1, label: 'Fevereiro', abrev: 'Fev' },
    { value: 2, label: 'Março', abrev: 'Mar' },
    { value: 3, label: 'Abril', abrev: 'Abr' },
    { value: 4, label: 'Maio', abrev: 'Mai' },
    { value: 5, label: 'Junho', abrev: 'Jun' },
    { value: 6, label: 'Julho', abrev: 'Jul' },
    { value: 7, label: 'Agosto', abrev: 'Ago' },
    { value: 8, label: 'Setembro', abrev: 'Set' },
    { value: 9, label: 'Outubro', abrev: 'Out' },
    { value: 10, label: 'Novembro', abrev: 'Nov' },
    { value: 11, label: 'Dezembro', abrev: 'Dez' }
]

export const mesAtual = mesOptions[new Date().getMonth()];

export const anoAtual = new Date().getFullYear();