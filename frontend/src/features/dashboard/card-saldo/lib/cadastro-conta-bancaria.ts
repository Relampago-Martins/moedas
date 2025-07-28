import * as z from 'zod';

export const contaBancariaSchema = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: 'Nome é obrigatório' }),
    saldo: z.number().min(0, { message: 'Saldo não pode ser negativo' }),
    apelido: z.string().min(1, { message: 'Apelido é obrigatório' }),
});

export type ContaBancariaSchema = z.infer<typeof contaBancariaSchema>;

export const selectContaOpcoes = [
    { value: '001', label: 'Banco do Brasil' },
    { value: '033', label: 'Santander' },
    { value: '104', label: 'Caixa Econômica Federal' },
    { value: '237', label: 'Bradesco' },
    { value: '341', label: 'Itaú Unibanco' },
    { value: '399', label: 'HSBC' },
    { value: '745', label: 'Citibank' },
    { value: '756', label: 'Bancoob' },
    { value: '070', label: 'Banco Inter' },
];
