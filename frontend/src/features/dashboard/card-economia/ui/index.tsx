import { getCarteira } from '@/shared/api/endpoints';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { MoneyTile } from '@/shared/ui/custom/money-tile';
import { TFiltroPeriodo } from '@/types/filters';
import { EconomiaChart } from './economia-chart';

type CardEconomiaProps = {
    className?: string;
    params: TFiltroPeriodo;
};
export async function CardEconomia({ className, params }: CardEconomiaProps) {
    const carteira = await getCarteira(params);

    const totalMovs = carteira.total_receitas + carteira.total_despesas;
    const receitasPercent = carteira.total_receitas / totalMovs;
    const despesasPercent = carteira.total_despesas / totalMovs;

    return (
        <Card className={`${className} flex grow flex-col`}>
            <CardHeader className="flex h-8 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted">
                <i className="ph ph-scales flex text-lg text-muted " />
                <span className="text-sm">Economia</span>
            </CardHeader>
            <CardContent className="flex h-full flex-col items-center justify-end gap-0">
                <EconomiaChart carteira={carteira} />
                <div className="flex w-full items-center gap-2 px-10">
                    <span className="h-3 w-3 rounded-sm bg-success-foreground"></span>
                    <span className="mr-auto text-sm text-muted">Receita</span>
                    <MoneyTile value={carteira.total_receitas} />
                </div>
                <div className="flex w-full items-center gap-2 px-10">
                    <span className="h-3 w-3 rounded-sm bg-destructive-foreground"></span>
                    <span className="mr-auto text-sm text-muted">Despesa</span>
                    <MoneyTile value={carteira.total_despesas} />
                </div>

                {/* <DetalheEconomiaMensal carteira={carteira} /> */}
            </CardContent>
        </Card>
    );
}
