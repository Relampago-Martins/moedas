'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Carteira } from '@/types/models';
import { GraficoEconomia } from '../grafico-economia';
import { useFlipCard } from './flip-card';
type ResumoEconomiaMensalProps = {
    carteira: Carteira;
};
export function ResumoEconomiaMensal({ carteira }: ResumoEconomiaMensalProps) {
    const economia = carteira.total_receitas - carteira.total_despesas;
    const { flip } = useFlipCard();
    return (
        <button onClick={flip} className="flex h-full w-full flex-col">
            <div className="flex h-full w-full items-center justify-center gap-2 px-4 py-2">
                {Number.isFinite(carteira.percentualEconomia) ? (
                    <GraficoEconomia carteira={carteira} />
                ) : null}
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
            <div className="flex w-full items-center justify-center gap-2 pb-4  text-sm text-muted ">
                <i className="ph ph-arrow-bend-down-right text-base"></i>
                <span className="hover:underline">Ver mais</span>
            </div>
        </button>
    );
}
