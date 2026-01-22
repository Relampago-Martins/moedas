'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { numberToCurrency } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ContaBancariaPreview } from '@/types/models/conta-bancaria';

type ListaContaBancariaColProps = { contasBancarias: ContaBancariaPreview[] };
export function ListaContaBancariaCol({
    contasBancarias,
}: ListaContaBancariaColProps) {
    const { goToStep, events } = useStepper();
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2">
                <span className="text-sm text-muted">Contas Bancárias</span>
            </div> 
            {contasBancarias.map((conta) => {
                const isAtivo = conta.ativo;
                return (
                    <button
                            type="button"
                            key={conta.id}
                            onClick={() => {
                                goToStep({
                                    name: 'detalhe-conta-bancaria',
                                    level: 1,
                                });
                                events.submit('onSelectContaBancaria', conta);
                            }}
                            className={`flex w-full items-center gap-3 rounded-md p-2 text-start hover:bg-accent ${isAtivo ? '' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            <AvatarBanco banco={conta.banco} />

                            <div className="flex w-full flex-col">
                                <span className="">{conta.apelido || '---'}</span>
                                <span className="shrink-0 text-sm text-muted">
                                    {conta.banco.abreviacao}
                                </span>
                            </div>
                            <span className="flex justify-end font-medium">
                                {numberToCurrency(conta.saldo)}
                            </span>
                    </button>
                )
            })}
            <Button
                className="flex w-full items-center gap-2 hover:no-underline hover:[&>span]:underline"
                variant={`link`}
                onClick={() => {
                    goToStep({ name: 'cadastro-conta-bancaria', level: 1 });
                    events.submit('onSelectContaBancaria', null);
                }}
            >
                <i className="ph ph-plus-circle flex text-lg"></i>
                <span>Adicionar Conta</span>
            </Button>
        </div>
    );
}
