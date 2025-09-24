'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { PreviousBtn } from '@/features/conta-bancaria/ui/shared/previous-btn';
import { Button } from '@/shared/ui/button';
import { MoneyTile } from '@/shared/ui/custom/money-tile';
import { ContaBancaria } from '@/types/models/conta-bancaria';
import { useEffect, useState } from 'react';

type StepDetalheContaBancariaProps = {
    value: string;
    level: number;
};
export function StepDetalheContaBancaria({
    value,
    level,
}: StepDetalheContaBancariaProps) {
    const [contaBancaria, setContaBancaria] = useState<ContaBancaria | null>(
        null,
    );
    const { events, goToStep } = useStepper();
    useEffect(() => {
        events.subscribe('onSelectContaBancaria', (conta) => {
            setContaBancaria(conta);
        });
    }, []);

    return (
        <StepperContent
            value={value}
            level={level}
            className="flex flex-col gap-2"
        >
            <PreviousBtn />
            {contaBancaria ? (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <AvatarBanco
                            width={40}
                            height={40}
                            banco={contaBancaria.banco}
                        />

                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">
                                {contaBancaria.apelido}
                            </h2>
                            <p className="text-base text-muted">
                                {contaBancaria.banco.nome}
                            </p>
                        </div>
                    </div>
                    <MoneyTile value={Number(contaBancaria.saldo)} />
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant={`outline`}
                            className="w-full"
                            onClick={() => {
                                goToStep({
                                    name: 'edit-conta-bancaria',
                                    level: 2,
                                });
                            }}
                        >
                            Editar
                        </Button>
                        <Button
                            type="button"
                            variant={`destructive`}
                            className="w-2/3"
                            onClick={() => {
                                events.submit(
                                    'onExcluirContaBancaria',
                                    contaBancaria,
                                );
                                goToStep({
                                    name: 'excluir-conta-bancaria',
                                    level: 2,
                                });
                            }}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    Não há banco selecionado.
                </div>
            )}
        </StepperContent>
    );
}
