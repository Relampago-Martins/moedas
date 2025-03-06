export type Categoria = {
    sigla: string;
    total_gastos: number;
    total_receitas: number;
    cor: string;
    nome: string;
    icone: string;
    is_base: boolean;
    tipo: "D" | "R";
};