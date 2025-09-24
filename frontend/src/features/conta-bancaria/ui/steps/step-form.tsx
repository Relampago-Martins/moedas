'use client';
import { StepObject } from '@/entities/stepper/lib/types';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { PreviousBtn } from '@/features/conta-bancaria/ui/shared/previous-btn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
    contaBancariaSchema,
    ContaBancariaSchema,
} from '../../../dashboard/card-saldo/lib/cadastro-conta-bancaria';
import { FormContaBancaria } from '../../../dashboard/card-saldo/ui/modal/form-conta-bancaria';

type StepFormContaBancariaProps = {
    step: StepObject<string>;
    formValues?: ContaBancariaSchema;
};

/**
 * Componente para o formulário de conta bancária no stepper
 * @param param0 Props do componente
 * @returns Componente StepFormContaBancaria
 *
 * TODO: Diferenciar criação e edição de conta bancária, na edição tem menos campos e o titulo muda
 */
export function StepFormContaBancaria({ step }: StepFormContaBancariaProps) {
    const { events } = useStepper();
    const form = useForm<ContaBancariaSchema>({
        resolver: zodResolver(contaBancariaSchema),
        defaultValues: {
            id: undefined,
            banco: undefined,
            saldo: 0,
            apelido: '',
        },
    });
    const isCreate = useMemo(() => !form.getValues('id'), [form]);
    useEffect(() => {
        events.subscribe('onSelectBanco', (banco) => {
            form.setValue('banco', banco);
        });
        events.subscribe('onSelectContaBancaria', (contaBancaria) => {
            form.reset({
                id: contaBancaria?.id,
                banco: contaBancaria?.banco,
                saldo: Number(contaBancaria?.saldo || 0),
                apelido: contaBancaria?.apelido,
            });
        });
    }, []);

    return (
        <StepperContent
            value={step.name}
            level={step.level}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col">
                <PreviousBtn />
                <h2 className="text-lg font-semibold">
                    {isCreate ? 'Criar' : 'Editar'} conta bancária
                </h2>
            </div>
            <FormContaBancaria formState={form} />
        </StepperContent>
    );
}
