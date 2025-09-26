import * as z from 'zod';

export const bancoSchema = z.object({
    id: z.number(),
    ispb: z.string(),
    nome: z.string(),
    abreviacao: z.string(),
    foto: z.string().url().optional().or(z.literal('')),
});
