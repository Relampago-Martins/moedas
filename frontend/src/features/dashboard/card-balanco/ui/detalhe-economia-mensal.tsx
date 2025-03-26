'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { Carteira } from '@/types/models';
import { CardTransacao } from './CardTransacao';
import { useFlipCard } from './components/flip-card';

type DetalheEconomiaMensalProps = {
    carteira: Carteira;
};

export function DetalheEconomiaMensal({
    carteira,
}: DetalheEconomiaMensalProps) {
    const { flip } = useFlipCard();

    return (
        <div className="flex h-full flex-col justify-between gap-1 ">
            <div className="flex h-full flex-col items-center justify-center gap-1">
                <CardTransacao className="gap-3 text-success-foreground">
                    <div className="flex flex-row items-center gap-2">
                        Receitas
                    </div>
                    <div>{numberToCurrency(carteira.total_receitas)}</div>
                </CardTransacao>
                <CardTransacao className="gap-3 text-destructive-foreground">
                    <div className="flex flex-row items-center gap-2">
                        Despesas
                    </div>
                    <div>{numberToCurrency(carteira.total_despesas)}</div>
                </CardTransacao>
                <Separator className="my-1" />
                <CardTransacao className="gap-3 font-semibold opacity-70">
                    <div>Balanço</div>
                    <div>
                        {numberToCurrency(
                            carteira.total_receitas - carteira.total_despesas,
                        )}
                    </div>
                </CardTransacao>
            </div>
            <button
                onClick={flip}
                className="flex w-full items-center justify-center gap-2 border-t py-2 text-sm text-muted"
            >
                <i className="ph ph-arrow-bend-down-left text-base"></i>
                Voltar
            </button>
        </div>
    );
}
