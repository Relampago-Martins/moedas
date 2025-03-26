'use client';
import { FormReceita } from '@/entities/movimentacoes/forms/form-receita';
import { StepObject } from '@/entities/stepper/lib/types';
import { receita } from '@/shared/lib/forms';
import { ReceitaSchema } from '@/types/models/receita';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    StepperContent,
    useStepper,
} from '../../../../entities/stepper/ui/stepper';
import { DialogOrDrawerHeader } from '../step-header';

type StepFormReceitaProps = {
    step: StepObject<string>;
    formValues?: ReceitaSchema;
    onSucess?: () => void;
};

export function StepFormReceita({
    step,
    formValues,
    onSucess,
}: StepFormReceitaProps) {
    const { previous, events, hasPrevious } = useStepper();
    const form = useForm<ReceitaSchema>({
        resolver: zodResolver(receita),
        defaultValues: formValues,
    });
    const emptyForm = {
        valor: 0,
        descricao: '',
    };

    useEffect(() => {
        events.subscribe('onSelectCategoria', (categoria) => {
            form.setValue('categoria', categoria);
        });
    }, []);

    useEffect(() => {
        if (form.getValues('id') === undefined) {
            form.reset(formValues);
        }
    }, [formValues]);

    return (
        <StepperContent value={step.name} level={step.level}>
            <DialogOrDrawerHeader
                withBackButton={hasPrevious}
                title={
                    <span className="flex items-center gap-2 text-xl text-success-foreground">
                        <i className="ph-bold ph-trend-up" />
                        {formValues?.id ? 'Editar Receita' : 'Criar Receita'}
                    </span>
                }
                onBack={() => {
                    form.reset(formValues?.id ? formValues : emptyForm);
                    previous();
                }}
            />
            <FormReceita
                formState={form}
                onSucess={() => {
                    onSucess?.();
                    setTimeout(() => previous(), 100);
                }}
            />
        </StepperContent>
    );
}
