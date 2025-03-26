'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Carteira } from '@/types/models';
import { useFlipCard } from './components/flip-card';
import { GraficoEconomia } from './grafico-economia';
type ResumoEconomiaMensalProps = {
    carteira: Carteira;
};
export function ResumoEconomiaMensal({ carteira }: ResumoEconomiaMensalProps) {
    const economia = carteira.total_receitas - carteira.total_despesas;
    const { flip } = useFlipCard();
    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex h-full w-full items-center justify-center gap-2 px-4 py-2">
                <GraficoEconomia carteira={carteira} />
                <div
                    className="w-full shrink grow-0 text-wrap break-words text-center text-base"
                    dangerouslySetInnerHTML={{
                        __html: `
                        Parabéns! Você economizou  
                        <b class="text-success-foreground text-sm">R$</b>
                        <b class="text-success-foreground">
                            ${numberToCurrency(economia).replace('R$', '').trim()}
                        </b> este mês.`,
                    }}
                ></div>
            </div>
            <button
                onClick={flip}
                className="flex w-full items-center justify-center gap-2 border-t py-2 text-sm text-muted"
            >
                <i className="ph ph-arrow-bend-down-right text-base"></i>
                Detalhes
            </button>
        </div>
    );
}
