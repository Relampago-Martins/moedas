'use client';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { numberToCurrency } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ContaBancaria } from '@/types/models/conta-bancaria';

type ListaContaBancariaColProps = { contasBancarias: ContaBancaria[] };
export function ListaContaBancariaCol({
    contasBancarias,
}: ListaContaBancariaColProps) {
    const { goToStep, events } = useStepper();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span className="text-muted">Contas Bancárias</span>
            </div>
            {contasBancarias.map((conta) => (
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
                    className="flex w-full items-center gap-3 rounded-md py-1 text-start"
                >
                    <AvatarBanco banco={conta.banco} />

                    <div className="flex w-full flex-col">
                        <span className="font-medium">
                            {conta.apelido || '---'}
                        </span>
                        <span className="shrink-0 text-sm text-muted">
                            {conta.banco.nome}
                        </span>
                    </div>
                    <span className="flex justify-end">
                        {numberToCurrency(conta.saldo)}
                    </span>
                </button>
            ))}
            <div className="flex justify-center">
                <Button
                    className="mt-2 flex w-full items-center gap-2 hover:no-underline"
                    variant={`link`}
                    onClick={() => {
                        goToStep({ name: 'cadastro-conta-bancaria', level: 1 });
                        events.submit('onSelectContaBancaria', null);
                    }}
                >
                    <i className="ph ph-plus-circle flex text-lg"></i>
                    <span className="hover:underline">Adicionar Conta</span>
                </Button>
            </div>
        </div>
    );
}
