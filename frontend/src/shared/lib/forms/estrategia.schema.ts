import { z } from 'zod';

export const EstrategiaSchema = z
    .object({
        percentual_gastos: z.coerce
            .number({
                invalid_type_error: 'Percentual de gastos deve ser um número.',
                required_error: 'Percentual de gastos é obrigatório.',
            })
            .min(0, 'Percentual de gastos não pode ser menor que 0.')
            .max(100, 'Percentual de gastos não pode ser maior que 100.')
            .default(0),
        percentual_investimentos: z.coerce
            .number({
                invalid_type_error:
                    'Percentual de investimentos deve ser um número.',
                required_error: 'Percentual de investimentos é obrigatório.',
            })
            .min(0, 'Percentual de investimentos não pode ser menor que 0.')
            .max(100, 'Percentual de investimentos não pode ser maior que 100.')
            .default(0),
        percentual_dividas: z.coerce
            .number({
                invalid_type_error: 'Percentual de dívidas deve ser um número.',
                required_error: 'Percentual de dívidas é obrigatório.',
            })
            .min(0, 'Percentual de dívidas não pode ser menor que 0.')
            .max(100, 'Percentual de dívidas não pode ser maior que 100.')
            .default(0),
        percentual_reserva: z.coerce
            .number({
                invalid_type_error: 'Percentual de reserva deve ser um número.',
                required_error: 'Percentual de reserva é obrigatório.',
            })
            .min(0, 'Percentual de reserva não pode ser menor que 0.')
            .max(100, 'Percentual de reserva não pode ser maior que 100.')
            .default(0),
    })
    .superRefine((data, ctx) => {
        const soma =
            data.percentual_gastos +
            data.percentual_investimentos +
            data.percentual_dividas +
            data.percentual_reserva;
        if (Math.abs(soma - 100) > 0.001) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'A soma dos percentuais deve ser exatamente 100.',
                path: [],
            });
        }
    });

export type EstrategiaFormData = z.infer<typeof EstrategiaSchema>;
