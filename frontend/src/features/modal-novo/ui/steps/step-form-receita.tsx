import { FormReceita } from '@/entities/movimentacoes/forms/form-receita';
import { StepObject } from '@/entities/stepper/lib/types';
import { receita } from '@/shared/lib/forms';
import { useEvent } from '@/shared/ui/custom/use-event';
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
    subscribeEvent: ReturnType<typeof useEvent>['subscribe'];
    step: StepObject<string>;
    formValues?: ReceitaSchema;
    onSucess?: () => void;
};

export function StepFormReceita({
    subscribeEvent,
    step,
    formValues,
    onSucess,
}: StepFormReceitaProps) {
    const { previous } = useStepper();
    const form = useForm<ReceitaSchema>({
        resolver: zodResolver(receita),
        defaultValues: formValues,
    });
    const emptyForm: ReceitaSchema = {
        valor: 0,
        categoria: '',
        descricao: '',
    };

    useEffect(() => {
        subscribeEvent('onSelectCategoria', (categoria) => {
            form.setValue('categoria', categoria.sigla);
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
                title={formValues?.id ? 'Editar Receita' : 'Nova Receita'}
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
