import { Categoria } from "./categoria";

export type Movimentacao = {
    id: number;
    categoria: Categoria;
    tipo: 'R' | 'D';
    descricao: string;
    valor: string;
    data: string;
    user: number;
};