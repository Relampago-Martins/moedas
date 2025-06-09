'use client';
import { Separator } from '@/shared/ui/separator';
import { Carteira } from '@/types/models';
import { MoneyTile } from '../../../../../shared/ui/custom/money-tile';
import { useFlipCard } from './flip-card';

type DetalheEconomiaMensalProps = {
    carteira: Carteira;
};

export function DetalheEconomiaMensal({
    carteira,
}: DetalheEconomiaMensalProps) {
    const { flip } = useFlipCard();

    return (
        <button
            onClick={flip}
            className="flex h-full w-full flex-col items-center justify-between gap-1 "
        >
            <div className="flex h-full w-fit flex-col items-end justify-center gap-2 px-4">
                <div className="flex w-full items-center gap-4 text-success-foreground">
                    <i className="ph ph-trend-up flex text-2xl"></i>
                    <MoneyTile value={carteira.total_receitas} />
                </div>
                <div className="flex w-full items-center gap-4 text-destructive-foreground">
                    <i className="ph ph-trend-down flex text-2xl"></i>
                    <MoneyTile className="" value={carteira.total_despesas} />
                </div>
                <Separator className="my-1" />
                <div className="flex w-full items-center gap-4 text-foreground">
                    <i className="ph ph-scales flex text-2xl"></i>
                    <MoneyTile
                        value={
                            carteira.total_receitas - carteira.total_despesas
                        }
                    />
                </div>
            </div>
            <div className="flex w-full items-center justify-center gap-2 pb-4  text-sm text-muted ">
                <i className="ph ph-arrow-bend-down-left text-base"></i>
                <span className="hover:underline">Voltar</span>
            </div>
        </button>
    );
}
