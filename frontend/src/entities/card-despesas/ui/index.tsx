'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Movimentacao } from '@/types/models/movimentacao';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
type CardDespesasProps = {
    despesas: Movimentacao[];
};

export function CardDespesas({ despesas }: CardDespesasProps) {
    const totalDespesas = despesas.reduce(
        (acc, despesa) => acc + Number(despesa.valor),
        0,
    );
    const chartData = despesas.map((despesa) => ({
        date: new Date(despesa.data).getTime(),
        value: Number(despesa.valor),
    }));
    return (
        <div
            className="dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.3] relative min-w-[200px]
        overflow-hidden rounded-md border-[1px] border-border bg-card pt-4"
        >
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white
                [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)] dark:bg-black"
            ></div>
            <h4 className="absolute left-2 top-2 text-base text-muted">
                Despesas
            </h4>
            {/* remove init animation */}
            <ResponsiveContainer width="100%" height={50}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    {/* The line */}
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--destructive-foreground)"
                        strokeWidth={1}
                        fill="var(--destructive)"
                        fillOpacity={1}
                        dot={false}
                        isAnimationActive={false}
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
        </div>
    );
}
