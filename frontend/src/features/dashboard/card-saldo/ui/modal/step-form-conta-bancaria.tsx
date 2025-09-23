'use client';
import { StepObject } from '@/entities/stepper/lib/types';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    contaBancariaSchema,
    ContaBancariaSchema,
} from '../../lib/cadastro-conta-bancaria';
import { PreviousBtn } from '../shared/previous-btn';
import { FormContaBancaria } from './form-conta-bancaria';

type StepFormContaBancariaProps = {
    step: StepObject<string>;
    formValues?: ContaBancariaSchema;
};

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
                <h2 className="text-lg font-semibold">Criar conta bancária</h2>
            </div>
            <FormContaBancaria formState={form} />
        </StepperContent>
    );
}
