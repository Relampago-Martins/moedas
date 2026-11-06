'use client';

import {
    criarOrcamento,
    deletarOrcamento,
    getOrcamento,
} from '@/shared/api/endpoints/orcamento';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    LimiteGastosSchema,
    type LimiteGastosFormData,
} from './limite-gastos.schema';

/**
 * Form state of the spending limit: loads the saved limit when it opens and
 * saves it as the fraction the API expects (0 to 1).
 */
export function useLimiteGastosForm(open: boolean, onSaved: () => void) {
    const router = useRouter();
    const form = useForm<LimiteGastosFormData>({
        resolver: zodResolver(LimiteGastosSchema),
        defaultValues: { limite_gastos: 50 },
    });

    useEffect(() => {
        if (!open) return;
        getOrcamento().then((orcamento) => {
            if (orcamento?.limite_gastos) {
                form.reset({
                    limite_gastos: Math.round(orcamento.limite_gastos * 100),
                });
            }
        });
    }, [open, form]);

    const save = async ({ limite_gastos }: LimiteGastosFormData) => {
        try {
            //gambiarra para atualizar ou criar o orçamento
            //hehe só altera isso aí bruno do futuro
            //faz do jeito certo ;)
            const atual = await getOrcamento();
            if (atual?.id) await deletarOrcamento(atual.id);
            await criarOrcamento({
                limite_gastos: limite_gastos / 100,
                salario: 0, // Assuming salario is not needed for this operation
            });
            toast.success('Limite de gastos salvo!');
            onSaved();
            router.refresh();
        } catch {
            toast.error(
                'Não foi possível salvar o limite. Tente novamente mais tarde.',
            );
        }
    };

    return { form, onSubmit: form.handleSubmit(save) };
}
