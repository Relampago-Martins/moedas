import { numberToCurrency } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ContaBancaria } from '@/types/models/conta-bancaria';

type ListaContaBancariaColProps = { contasBancarias: ContaBancaria[] };
export function ListaContaBancariaCol({
    contasBancarias,
}: ListaContaBancariaColProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <i className="ph ph-bank flex text-xl text-muted" />
                <span className="text-muted">Contas Bancárias</span>
            </div>
            {contasBancarias.map((conta) => (
                <div
                    key={conta.nome}
                    className="flex w-full items-center gap-2 rounded-md py-1 "
                >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-normal text-primary-foreground">
                        {conta.nome.slice(0, 3)}
                    </span>
                    <span>{conta.nome}</span>
                    <span className="flex w-full justify-end">
                        {numberToCurrency(conta.saldo)}
                    </span>
                </div>
            ))}
            <Button className="flex items-center gap-2">
                <i className="ph ph-plus flex text-base"></i>
                <span>Adicionar Conta</span>
            </Button>
        </div>
    );
}
