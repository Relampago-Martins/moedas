const DESPESAS_EXEMPLO: string[] = [
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

const RECEITAS_EXEMPLO: string[] = [
    'Salário do mês',
    'Freela de design',
    'Venda de roupas usadas',
    'Dividendos de ações',
    'Empréstimo do pai',
    'Bônus da empresa',
    'Renda extra com Uber',
    'Venda de doces',
];

export const getNomeDespesaAleatoria = () =>
    DESPESAS_EXEMPLO[Math.floor(Math.random() * DESPESAS_EXEMPLO.length)];

export const getNomeReceitaAleatoria = () =>
    RECEITAS_EXEMPLO[Math.floor(Math.random() * RECEITAS_EXEMPLO.length)];
