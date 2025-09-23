import { Categoria } from './categoria';
import { ContaBancaria } from './conta-bancaria';

export type Movimentacao = {
    id: number;
    categoria: Categoria;
    tipo: 'R' | 'D';
    descricao: string;
    valor: string;
    data: string;
    user: number;
    conta_bancaria?: ContaBancaria;
};
