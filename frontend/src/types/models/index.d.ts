export type Carteira = {
    saldo: number;
    total_despesas: number;
    total_receitas: number;
    diff_percentual: number;
    percentualEconomia: number;
    economia: {
        valor: number;
        percentual: number;
        mensagem: string;
    };
};
