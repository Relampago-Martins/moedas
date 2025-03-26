import { getCarteira } from '@/shared/api/endpoints';
import { TFiltroPeriodo } from '@/types/filters';
import { FlipCard } from './components/flip-card';
import { WavesCup } from './components/waves-cup';
import { DetalheEconomiaMensal } from './detalhe-economia-mensal';
import { ResumoEconomiaMensal } from './resumo-economia-mensal';

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
                className="min-h-[200px] w-full"
                front={<ResumoEconomiaMensal carteira={carteira} />}
                back={<DetalheEconomiaMensal carteira={carteira} />}
            ></FlipCard>
        </div>
    );
}
