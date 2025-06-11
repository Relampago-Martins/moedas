'use client';
import { Separator } from '@/shared/ui/separator';
import { Carteira } from '@/types/models';
import { MoneyTile } from '../../../../../shared/ui/custom/money-tile';

type DetalheEconomiaMensalProps = {
    carteira: Carteira;
};

export function DetalheEconomiaMensal({
    carteira,
}: DetalheEconomiaMensalProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex w-full items-center gap-4 ">
                <i className="ph ph-trend-up flex text-xl text-success-foreground"></i>
                <div className="flex w-full justify-end">
                    <MoneyTile value={carteira.total_receitas} />
                </div>
            </div>
            <div className="d flex w-full items-center gap-4">
                <i className="ph ph-trend-down flex text-xl text-destructive-foreground"></i>
                <div className="flex w-full justify-end">
                    <MoneyTile className="" value={carteira.total_despesas} />
                </div>
            </div>
            <Separator className="my-1" />
            <div className="flex w-full items-center gap-4 ">
                <i className="ph ph-scales flex text-xl text-muted"></i>
                <div className="flex w-full justify-end">
                    <MoneyTile
                        value={
                            carteira.total_receitas - carteira.total_despesas
                        }
                    />
                </div>
            </div>
        </div>
    );
}
