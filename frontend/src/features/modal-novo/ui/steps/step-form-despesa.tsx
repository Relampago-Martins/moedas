import { FormDespesa } from '@/entities/movimentacoes/forms/form-despesa';
import { despesa } from '@/shared/lib/forms';
import { useEvent } from '@/shared/ui/custom/use-event';
import { DespesaSchema } from '@/types/models/despesa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DialogOrDrawerHeader } from '../step-header';
import { StepObject, StepperContent, useStepper } from '../stepper';

type StepFormDespesaProps = {
    subscribeEvent: ReturnType<typeof useEvent>['subscribe'];
    stepBack: StepObject<string>;
    step: StepObject<string>;
    formValues?: DespesaSchema;
    onSucess?: () => void;
};

export function StepFormDespesa({
    subscribeEvent,
    stepBack,
    step,
    formValues,
    onSucess,
}: StepFormDespesaProps) {
    const { goToStep } = useStepper();
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
        subscribeEvent('onSelectCategoria', (categoria) =>
            form.setValue('categoria', categoria.sigla),
        );
    }, []);

    useEffect(() => {
        form.reset(formValues);
    }, [formValues]);

    return (
        <StepperContent value={step.name} level={step.level}>
            <DialogOrDrawerHeader
                title={formValues?.id ? 'Editar despesa' : 'Nova despesa'}
                onBack={() => {
                    form.reset(formValues?.id ? formValues : emptyForm);
                    goToStep(stepBack);
                }}
            />
            <FormDespesa
                formState={form}
                onSucess={() => {
                    onSucess?.();
                    setTimeout(() => goToStep(stepBack), 100);
                }}
            />
        </StepperContent>
    );
}
