'use client';

import { RadialBar, RadialBarChart } from 'recharts';

import { numberToCurrency } from '@/shared/lib/utils';
import { ChartConfig, ChartContainer } from '@/shared/ui/chart';
import { Carteira } from '@/types/models';

export const description = 'A radial chart with stacked sections';

type EconomiaChartProps = {
    carteira: Carteira;
};
const chartConfig = {
    desktop: {
        label: 'receitas',
        color: 'var(--success-foreground)',
    },
    mobile: {
        label: 'despesas',
        color: 'var(--destructive-foreground)',
    },
} satisfies ChartConfig;

export function EconomiaChart({ carteira }: EconomiaChartProps) {
    const economia = carteira.total_receitas - carteira.total_despesas;
    const totalReceitas = carteira.total_receitas - carteira.total_despesas;

    const chartData = [
        {
            name: 'Economia',
            receitas: totalReceitas < 0 ? 0 : totalReceitas,
            despesas: carteira.total_despesas,
        },
    ];
    return (
        <div className="relative">
            <ChartContainer
                config={chartConfig}
                className="mx-auto flex w-full"
                style={{
                    height: '120px',
                }}
            >
                <RadialBarChart
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    cy="85%"
                    height={250}
                    data={chartData}
                    endAngle={180}
                    innerRadius={90}
                    outerRadius={120}
                >
                    <RadialBar
                        isAnimationActive={true}
                        animationEasing="ease-out"
                        dataKey="receitas"
                        stackId="a"
                        cornerRadius={5}
                        fill="var(--success-foreground)"
                        className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                        isAnimationActive={true}
                        animationEasing="ease-out"
                        dataKey="despesas"
                        fill="var(--destructive-foreground)"
                        stackId="a"
                        cornerRadius={5}
                        className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>
            <div className="absolute bottom-4 left-0 z-[0] w-full">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-sm text-muted">
                        <i className="ph ph-scales text-3xl" />
                    </span>
                    <span className="flex w-full items-center justify-center gap-2">
                        <span className="mt-1 text-sm font-normal opacity-70">
                            R$
                        </span>
                        <span className="shrink-0 text-lg font-semibold">
                            {numberToCurrency(economia)
                                .replace('R$', '')
                                .trim()}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
