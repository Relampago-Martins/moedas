'use client';
import { StepObject } from '@/entities/stepper/lib/types';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { PreviousBtn } from '@/features/conta-bancaria/ui/shared/previous-btn';
import { ContaBancariaPreview } from '@/types/models/conta-bancaria';
import { useEffect, useMemo, useState } from 'react';
import { CriarContaBancariaSchema } from '../../../lib/conta-bancaria.schema';
import { AlterarContaBancaria } from './alterar-conta-bancaria';
import { CriarContaBancaria } from './form-conta-bancaria';

type StepFormContaBancariaProps = {
    step: StepObject<string>;
    formValues?: CriarContaBancariaSchema;
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
    const [contaBancaria, setContaBancaria] =
        useState<ContaBancariaPreview | null>(null);
    const [banco, setBanco] = useState<ContaBancariaPreview['banco']>();

    const isCreate = useMemo(() => !contaBancaria, [contaBancaria]);

    useEffect(() => {
        events.subscribe('onSelectBanco', setBanco);
        events.subscribe('onSelectContaBancaria', setContaBancaria);
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
            {isCreate ? (
                <CriarContaBancaria
                    banco={banco}
                    contaBancaria={contaBancaria}
                />
            ) : (
                <AlterarContaBancaria contaBancaria={contaBancaria!} />
            )}
        </StepperContent>
    );
}
