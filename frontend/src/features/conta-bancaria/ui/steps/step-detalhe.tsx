'use client';
import { ItemMovimentacao } from '@/entities/movimentacoes/item-movimentacao/ui';
import { StepperContent, useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { PreviousBtn } from '@/features/conta-bancaria/ui/shared/previous-btn';
import { getContaBancariaById } from '@/shared/api/endpoints/conta-bancaria-cli';
import { numberToCurrency } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ContaBancaria } from '@/types/models/conta-bancaria';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

type StepDetalheContaBancariaProps = {
    value: string;
    level: number;
};
export function StepDetalheContaBancaria({
    value,
    level,
}: StepDetalheContaBancariaProps) {
    const contaBancariaId = useRef<number | undefined>(undefined);

    const { data: contaBancaria, isLoading } = useQuery<ContaBancaria | null>({
        queryKey: [`contaBancaria-${contaBancariaId.current || 'none'}`],
        queryFn: async () => {
            if (contaBancariaId.current) {
                const resp = await getContaBancariaById(
                    contaBancariaId.current,
                );
                return resp.data;
            }
            return null;
        },
    });
    const { events, goToStep } = useStepper();
    useEffect(() => {
        events.subscribe('onSelectContaBancaria', (conta) => {
            contaBancariaId.current = conta?.id;
        });
    }, [events]);

    return (
        <StepperContent
            value={value}
            level={level}
            className="flex flex-col gap-2"
        >
            <PreviousBtn />
            {contaBancaria ? (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <AvatarBanco
                            width={40}
                            height={40}
                            banco={contaBancaria.banco}
                        />

                        <div className="flex items-center gap-2">
                            <p className="text-base text-muted">
                                {contaBancaria.banco.abreviacao}
                            </p>
                            <span className="mx-1 h-5 w-[1px] bg-border"></span>
                            <p className="text-base text-muted">
                                {contaBancaria.apelido}
                            </p>
                        </div>
                        <div className="flex w-full justify-center text-3xl font-bold">
                            {numberToCurrency(contaBancaria.saldo)}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {contaBancaria.ultimas_transacoes.length === 0 ? (
                            <div className="flex h-28 flex-col items-center justify-center rounded-md border border-dashed">
                                <span className="text-sm text-muted">
                                    Nenhuma movimentação encontrada
                                </span>
                                <Button
                                    variant={'link'}
                                    className="h-auto gap-2"
                                >
                                    <i className="ph ph-plus flex"></i>
                                    Cadastrar
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-sm text-muted">
                                    Últimas movimentações
                                </h3>
                                {contaBancaria.ultimas_transacoes.map(
                                    (transacao) => (
                                        <ItemMovimentacao
                                            key={transacao.id}
                                            gasto={transacao}
                                            withBank={false}
                                        />
                                    ),
                                )}
                                <div className="flex cursor-pointer items-center justify-end gap-1 text-sm text-muted">
                                    <span className=" hover:underline">
                                        ver mais
                                    </span>
                                    <i className="ph ph-arrow-right flex"></i>
                                </div>
                            </>
                        )}
                    </div>
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
