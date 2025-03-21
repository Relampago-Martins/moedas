'use client';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { useModalNovoStore } from '@/features/modal-novo/lib/modal-novo-store';
import { numberToCurrency } from '@/shared/lib/utils';
import { TradeUpIcon } from '@/shared/ui/huge-icons/receita';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

export function CardReceitas() {
    const { movimentacoes } = useMovimentacaoContext();
    const openNovaReceita = useModalNovoStore((state) => () => {
        state.setDefaultStep({ name: 'receita', level: 1 });
        state.onOpenChange(true);
    });

    const receitas = movimentacoes.filter(
        (movimentacao) => movimentacao.tipo === 'R',
    );

    const totalDespesas = receitas.reduce(
        (acc, receita) => acc + Number(receita.valor),
        0,
    );
    const chartData = receitas.map((receita) => ({
        date: new Date(receita.data).getTime(),
        value: Number(receita.valor),
    }));
    return (
        <div className="flex w-full min-w-[200px] flex-col ">
            <div className="relative w-full overflow-hidden rounded-md border bg-card pt-8">
                <div className="absolute inset-0 z-[1] px-2 py-1">
                    <div className="flex items-center gap-1">
                        <TradeUpIcon className="h-5 w-5" />
                        <h4 className="text-base">Receitas</h4>
                    </div>
                </div>
                {/* remove init animation */}
                <ResponsiveContainer width="100%" height={30}>
                    <AreaChart
                        data={[
                            { date: 0, value: 0 },
                            ...chartData,
                            { date: Date.now(), value: 0 },
                        ]}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    >
                        {/* The line */}
                        <Area
                            type="linear"
                            dataKey="value"
                            stroke="var(--success-foreground)"
                            strokeWidth={1}
                            fill="var(--success)"
                            fillOpacity={1}
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="flex w-full items-center justify-end bg-success px-2 pb-1 pt-1">
                    <span className="mr-1 mt-1 text-base text-success-foreground">
                        R$
                    </span>
                    <span className="z-[1] text-2xl font-medium text-success-foreground">
                        {numberToCurrency(totalDespesas)
                            .replace('R$', '')
                            .trim()}
                    </span>
                </div>
                <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white
                [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"
                ></div>
            </div>
            <button
                onClick={openNovaReceita}
                className="flex items-center justify-center gap-2  pt-2 text-sm text-muted transition-transform hover:scale-110"
            >
                <i className="ph-bold ph-plus" />
                <span className="hover:underline">Receita</span>
            </button>
        </div>
    );
}
