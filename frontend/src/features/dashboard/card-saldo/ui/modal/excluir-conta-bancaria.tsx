'use client';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { deleteContaBancaria } from '@/shared/api/endpoints/conta-bancaria-cli';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { toast } from 'sonner';

import { ContaBancaria } from '@/types/models/conta-bancaria';
import { useEffect, useRef, useState } from 'react';
import { PreviousBtn } from '../shared/previous-btn';

type StepExcluirContaBancariaProps = {
    value: string;
    level: number;
};
export function StepExcluirContaBancaria({
    value,
    level,
}: StepExcluirContaBancariaProps) {
    const [contaBancaria, setContaBancaria] = useState<ContaBancaria | null>();
    const [podeExcluir, setPodeExcluir] = useState(false);
    const { events, goToStep } = useStepper();

    useEffect(() => {
        events.subscribe('onExcluirContaBancaria', (data) => {
            setContaBancaria(data);
        });
    }, []);

    const onDelete = async () => {
        if (contaBancaria?.id) {
            await deleteContaBancaria(contaBancaria.id);
            goToStep({ name: 'saldo-e-contas', level: 0 });
            toast.success('Conta bancária excluída com sucesso!', {
                duration: 4000,
            });
        }
    };

    return (
        <StepperContent
            value={value}
            level={level}
            className="flex flex-col gap-2"
        >
            <PreviousBtn />
            {contaBancaria ? (
                <div className="flex flex-col gap-0">
                    <h2 className="text-lg font-semibold">
                        Excluir Conta Bancária
                    </h2>
                    <p className="text-base text-muted">
                        Escreva &apos;
                        <strong>{contaBancaria.apelido}</strong>&apos; para
                        confirmar a exclusão.
                    </p>
                    <div className="mt-4 flex flex-col gap-4">
                        <InputWithFocus
                            onChange={(e) =>
                                setPodeExcluir(
                                    e.target.value === contaBancaria.apelido,
                                )
                            }
                        />

                        <Button
                            type="button"
                            className="w-full"
                            variant="destructive"
                            onClick={onDelete}
                            disabled={!podeExcluir}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>
            ) : (
                <p>Nenhuma conta bancária selecionada.</p>
            )}
        </StepperContent>
    );
}

const InputWithFocus = ({
    onChange,
}: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 450);
    }, []);

    return (
        <Input
            type="text"
            placeholder="Nome da conta"
            onChange={onChange}
            ref={inputRef}
        />
    );
};
