'use client';
import { useMovimentacaoContext } from '@/entities/modal-movimentacao/lib/use-movimentacao-context';
import { numberToCurrency } from '@/shared/lib/utils';
import { TradeDownIcon } from '@/shared/ui/huge-icons/gasto';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { getDefaultChartData } from '../lib/utils';

export function CardDespesas() {
    const { movimentacoes } = useMovimentacaoContext();
    const despesas = movimentacoes.filter(
        (movimentacao) => movimentacao.tipo === 'D',
    );
    const totalDespesas = despesas.reduce(
        (acc, despesa) => acc + Number(despesa.valor),
        0,
    );
    const [step1, step2] = getDefaultChartData(despesas[0]?.data);
    const chartData = [
        step1,
        ...despesas.map((despesa) => ({
            date: new Date(despesa.data).getTime(),
            value: Number(despesa.valor),
        })),
        step2,
    ];

    return (
        <div
            className="relative w-full min-w-[200px] overflow-hidden rounded-md
        border-[1px] border-border bg-card pt-8 bg-grid-small-black/[0.3] dark:bg-grid-small-white/[0.3]"
        >
            <div className="absolute inset-0 z-[1] px-2 py-1">
                <div className="flex items-center gap-1">
                    <TradeDownIcon className="h-5 w-5" />
                    <h4 className="text-base">Despesas</h4>
                </div>
            </div>
            {/* remove init animation */}
            <ResponsiveContainer width="100%" height={30}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
                >
                    {/* The line */}
                    <Area
                        type="linear"
                        dataKey="value"
                        stroke="var(--destructive-foreground)"
                        strokeWidth={1}
                        fill="var(--destructive)"
                        fillOpacity={1}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="flex w-full items-center justify-end bg-destructive px-2 pb-1 pt-1">
                <span className="mr-1 mt-1 text-base text-destructive-foreground">
                    R$
                </span>
                <span className="z-[1] text-2xl font-medium text-destructive-foreground">
                    {numberToCurrency(totalDespesas).replace('R$', '').trim()}
                </span>
            </div>
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white
                [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"
            ></div>
        </div>
    );
}
