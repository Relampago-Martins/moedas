import { Banco } from '@/types/models/banco';
export interface ContaBancaria {
    id?: number;
    apelido: string;
    banco: Banco;
    saldo: string;
}

export interface ContaBancariaForm {
    id?: number;
    apelido: string;
    banco_id: number; // ID do banco
    saldo: string;
}
