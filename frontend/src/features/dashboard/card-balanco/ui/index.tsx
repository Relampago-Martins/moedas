import { getCarteira } from '@/shared/api/endpoints';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { TFiltroPeriodo } from '@/types/filters';
import { EconomiaChart } from './economia-char';
import { DetalheEconomiaMensal } from './flip-card/detalhe-economia-mensal';

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
        <Card className={`${className} flex flex-col`}>
            <CardHeader className="flex h-10 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted">
                <i className="ph ph-scales text-lg" />
                <span className=" text-sm">Economia</span>
            </CardHeader>
            <CardContent className="flex h-full items-center justify-end gap-2">
                <EconomiaChart carteira={carteira} />
                <DetalheEconomiaMensal carteira={carteira} />
            </CardContent>
        </Card>
    );
}
