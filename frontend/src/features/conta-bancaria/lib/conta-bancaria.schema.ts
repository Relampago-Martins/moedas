import * as z from 'zod';
import { bancoSchema } from './banco.schema';

export const criarContaBancariaSchema = z.object({
    id: z.number().optional(),
    apelido: z.string().min(1, { message: 'Apelido é obrigatório' }),
    banco: bancoSchema,
    saldo: z.number().min(0, { message: 'Saldo não pode ser negativo' }),
});

export type CriarContaBancariaSchema = z.infer<typeof criarContaBancariaSchema>;

export const alterarContaBancariaSchema = criarContaBancariaSchema.omit({
    saldo: true,
    banco: true,
});

export type AlterarContaBancariaSchema = z.infer<
    typeof alterarContaBancariaSchema
>;
