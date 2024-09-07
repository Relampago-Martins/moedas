import { despesa } from "@/shared/lib/forms";
import * as z from "zod";

export type Despesa = z.infer<typeof despesa>;
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
