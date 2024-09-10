import { despesa } from "@/shared/lib/forms";
import * as z from "zod";

export type DespesaSchema = z.infer<typeof despesa>;
export type Despesa = {
    id: number;
    descricao: string;
    valor: number;
    categoria: {
        value: string;
        label: string;
    };
    forma_pagamento: {
        value: string;
        label: string;
    };
    data: string;
    usuario: number;
};
export type DespesaPreview = Pick<Despesa, 'id' | 'descricao' | 'valor' | 'categoria'>;

export type APIChoice = {
    value: string
    display_name: string
}

export type DespesaConfig = {
    actions:{
        POST: {
            categoria: {
                choices: APIChoice[]
            }
            forma_pagamento: {
                choices: APIChoice[]
            }
        }
    }
}
