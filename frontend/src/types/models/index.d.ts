export type Carteira = {
    saldo: number;
    total_despesas: number;
    total_receitas: number;
    diff_percentual: number;
    percentualEconomia: number;
    economia: number;
    orcamento: {
        limite_gastos: number;
        percentual_gastos: number;
        mensagem: string;
    };
};
