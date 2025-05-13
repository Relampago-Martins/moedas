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
            className="flex h-full w-full flex-col justify-between gap-1 "
        >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
                <div className="flex w-full items-center justify-between">
                    <MoneyTile
                        title="Receitas"
                        className="text-success-foreground"
                        value={carteira.total_receitas}
                    />

                    <MoneyTile
                        title="Despesas"
                        className="text-destructive-foreground"
                        value={carteira.total_despesas}
                    />
                </div>
                <Separator className="my-1" />
                <MoneyTile
                    title="Balanço"
                    value={carteira.total_receitas - carteira.total_despesas}
                />
            </div>
            <div className="flex w-full items-center justify-center gap-2 pb-4  text-sm text-muted ">
                <i className="ph ph-arrow-bend-down-left text-base"></i>
                <span className="hover:underline">Voltar</span>
            </div>
        </button>
    );
}
