import { CardTransacao } from '@/features/dashboard/card-balanco/ui/CardTransacao';
import { getCarteira } from '@/shared/api/endpoints';
import { numberToCurrency } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';
import { TFiltroPeriodo } from '@/types/filters';
import { FlipCard } from './components/flip-card';
import { WavesCup } from './components/waves-cup';
import { GraficoEconomia } from './GraficoEconomia';

type CardBalancoProps = {
    className?: string;
    params: TFiltroPeriodo;
};
export async function CardBalanco({ className, params }: CardBalancoProps) {
    const carteira = await getCarteira(params);

    const totalMovs = carteira.total_receitas + carteira.total_despesas;
    const receitasPercent = carteira.total_receitas / totalMovs;
    const despesasPercent = carteira.total_despesas / totalMovs;

    return (
        <div className={`flex items-center gap-2 rounded-md ${className}`}>
            <WavesCup value={receitasPercent} ehReceita />
            <WavesCup value={despesasPercent} ehReceita={false} />
            <FlipCard
                front={
                    <div className="flex h-full flex-col items-center justify-center gap-2">
                        <GraficoEconomia carteira={carteira} />
                        <div className="flex flex-col break-words text-center text-base text-muted">
                            {`Parabéns! Você economizou 
                                                ${numberToCurrency(0)} este mês.`}
                        </div>
                    </div>
                }
                back={
                    <div className="flex flex-col gap-1">
                        <CardTransacao className="gap-3 text-success-foreground">
                            <div className="flex flex-row items-center gap-2">
                                Receitas
                            </div>
                            <div>
                                {numberToCurrency(carteira.total_receitas)}
                            </div>
                        </CardTransacao>
                        <CardTransacao className="gap-3 text-destructive-foreground">
                            <div className="flex flex-row items-center gap-2">
                                Despesas
                            </div>
                            <div>
                                {numberToCurrency(carteira.total_despesas)}
                            </div>
                        </CardTransacao>
                        <Separator className="my-1" />
                        <CardTransacao className="gap-3 font-semibold opacity-70">
                            <div>Balanço</div>
                            <div>
                                {numberToCurrency(
                                    carteira.total_receitas -
                                        carteira.total_despesas,
                                )}
                            </div>
                        </CardTransacao>
                    </div>
                }
            ></FlipCard>
        </div>
    );
}
