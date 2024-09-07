import * as z from "zod";

export const despesa = z.object({
    id: z.number(),
    descricao: z.string().min(1).max(255),
    valor: z.number(),
    data: z.string(),
    categoria: z.string(),
    forma_pagamento: z.number(),
    usuario: z.number(),
});

export type Despesa = z.infer<typeof despesa>;
export type DespesaPreview = Pick<Despesa, 'id' | 'descricao' | 'valor', 'categoria'>;

export type DespesaConfig = {
    actions:{
        POST: {
            categoria: {
                choices: string[]
            }
            forma_pagamento: {
                choices: string[]
            }
        }
    }
}