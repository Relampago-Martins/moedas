import { despesa } from "@/shared/lib/forms";
import * as z from "zod";
import { Movimentacao } from "./movimentacao";

export type DespesaSchema = z.infer<typeof despesa>;
export type Despesa = Omit<Movimentacao, 'tipo'> & {
    forma_pagamento: {
        sigla: string;
        nome: string;
    };
    pago: boolean;
};
export type DespesaPreview = Pick<Despesa, 'id' | 'descricao' | 'valor' | 'categoria'>;

export type APIChoice = {
    value: string
    display_name: string
}

export type DespesaConfig = {
    actions:{
        POST: {
            forma_pagamento: {
                choices: APIChoice[]
            }
        }
    }
}
