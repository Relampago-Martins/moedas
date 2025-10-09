import { Banco } from '@/types/models/banco';
import { Movimentacao } from './movimentacao';
export interface ContaBancariaPreview {
    id?: number;
    apelido: string;
    banco: Banco;
    saldo: string;
}
export interface ContaBancaria extends ContaBancariaPreview {
    ultimas_transacoes: Movimentacao[];
}
export interface ContaBancariaForm {
    id?: number;
    apelido: string;
    banco_id: number; // ID do banco
    saldo: string;
}
