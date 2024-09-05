import { z } from 'zod';

export const gastoForm = z.object({
    descricao: z.string().min(1, { message: 'Descrição é obrigatória' }),
    valor: z.number().min(0.01, { message: 'Valor é obrigatório' }),
    data: z.string().min(1, { message: 'Data é obrigatória' }),
    // select com as categorias
    categoria: z.string().min(1, { message: 'Categoria é obrigatória' }),
}).required();