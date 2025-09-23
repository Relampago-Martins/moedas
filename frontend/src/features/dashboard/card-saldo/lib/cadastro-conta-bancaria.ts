import * as z from 'zod';

const bancoSchema = z.object({
    id: z.number(),
    ispb: z.string(),
    nome: z.string(),
    abreviacao: z.string(),
    foto: z.string().url().optional(),
});

export const contaBancariaSchema = z.object({
    id: z.number().optional(),
    apelido: z.string().min(1, { message: 'Apelido é obrigatório' }),
    banco: bancoSchema,
    saldo: z.number().min(0, { message: 'Saldo não pode ser negativo' }),
});

export type ContaBancariaSchema = z.infer<typeof contaBancariaSchema>;
