'use client';
import { FormDespesa } from '@/entities/movimentacoes/forms/form-despesa';
import { StepObject } from '@/entities/stepper/lib/types';
import { despesa } from '@/shared/lib/forms';
import { DespesaSchema } from '@/types/models/despesa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    StepperContent,
    useStepper,
} from '../../../../entities/stepper/ui/stepper';
import { DialogOrDrawerHeader } from '../step-header';

type StepFormDespesaProps = {
    step: StepObject<string>;
    formValues?: DespesaSchema;
    onSucess?: () => void;
};

export function StepFormDespesa({
    step,
    formValues,
    onSucess,
}: StepFormDespesaProps) {
    const { previous, events, hasPrevious } = useStepper();
    const form = useForm<DespesaSchema>({
        resolver: zodResolver(despesa),
        defaultValues: formValues,
    });
    const emptyForm = {
        descricao: '',
        valor: 0,
        forma_pagamento: '',
    };

    useEffect(() => {
        events.subscribe('onSelectCategoria', (categoria) => {
            form.setValue('categoria', categoria);
        });
        events.subscribe('onSelectDate', (date) => {
            form.setValue('data', date.toISOString().split('T')[0]);
        });
    }, []);

    useEffect(() => {
        // usado para resetar o form quando o usuário volta para o passo anterior
        if (form.getValues('id') === undefined) {
            form.reset(formValues);
        }
    }, [formValues]);

    return (
        <StepperContent value={step.name} level={step.level}>
            <DialogOrDrawerHeader
                withBackButton={hasPrevious}
                title={
                    <span className="flex items-center gap-2 text-xl text-destructive-foreground">
                        <i className="ph-bold ph-trend-down" />

                        {formValues?.id ? 'Editar Despesa' : 'Criar Despesa'}
                    </span>
                }
                onBack={() => {
                    form.reset(formValues?.id ? formValues : emptyForm);
                    previous();
                }}
            />
            <FormDespesa
                formState={form}
                onSucess={() => {
                    onSucess?.();
                    setTimeout(() => previous(), 100);
                }}
            />
        </StepperContent>
    );
}
