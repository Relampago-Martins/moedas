import { FormDespesa } from '@/entities/movimentacoes/forms/form-despesa';
import { StepObject } from '@/entities/stepper/lib/types';
import { despesa } from '@/shared/lib/forms';
import { useEvent } from '@/shared/ui/custom/use-event';
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
    subscribeEvent: ReturnType<typeof useEvent>['subscribe'];
    step: StepObject<string>;
    formValues?: DespesaSchema;
    onSucess?: () => void;
};

export function StepFormDespesa({
    subscribeEvent,
    step,
    formValues,
    onSucess,
}: StepFormDespesaProps) {
    const { previous } = useStepper();
    const form = useForm<DespesaSchema>({
        resolver: zodResolver(despesa),
        defaultValues: formValues,
    });
    const emptyForm = {
        descricao: '',
        valor: 0,
        forma_pagamento: '',
        categoria: '',
    };

    useEffect(() => {
        subscribeEvent('onSelectCategoria', (categoria) => {
            form.setValue('categoria', categoria.sigla);
        });
        subscribeEvent('onSelectDate', (date) => {
            form.setValue('data', date.toISOString().split('T')[0]);
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
                title={formValues?.id ? 'Editar despesa' : 'Nova despesa'}
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
