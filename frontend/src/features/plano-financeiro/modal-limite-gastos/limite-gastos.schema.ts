import { z } from 'zod';

export const LimiteGastosSchema = z.object({
    /** Percentual da renda (0 a 100) que pode virar gasto no mês. */
    limite_gastos: z
        .number()
        .int()
        .min(1, 'Defina um limite de gastos maior que 0%.')
        .max(100, 'O limite de gastos não pode passar de 100%.'),
});

export type LimiteGastosFormData = z.infer<typeof LimiteGastosSchema>;
