import { despesa } from "@/shared/lib/forms";
import * as z from "zod";
import { Categoria } from "./categoria";

export type DespesaSchema = z.infer<typeof despesa>;
export type Despesa = {
    id: number;
    descricao: string;
    valor: number;
    categoria: Categoria;
    forma_pagamento: {
        sigla: string;
        nome: string;
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
            forma_pagamento: {
                choices: APIChoice[]
            }
        }
    }
}
