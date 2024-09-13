export const STEPS = [
    'menu',
    'gasto',
    'receita',
    'transferencia',
    'investimento',
];

export const DESPESAS_EXEMPLO: string[] = [
    'Compras supermercado',
    'Conta de luz',
    'Almoço com as amigas',
    'Combustível',
    'Sushi delivery',
    'Assinatura Netflix',
    'Assinatura Spotify',
    'Cinema com a família',
    'Presente aniversário do João',
];

export const getNomeDespesaAleatoria = () =>
    DESPESAS_EXEMPLO[Math.floor(Math.random() * DESPESAS_EXEMPLO.length)];
