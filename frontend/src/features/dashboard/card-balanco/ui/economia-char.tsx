'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/shared/ui/chart';
import { Carteira } from '@/types/models';

export const description = 'A radial chart with stacked sections';

type EconomiaChartProps = {
    carteira: Carteira;
};
const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--success-foreground)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--destructive-foreground)',
    },
} satisfies ChartConfig;

export function EconomiaChart({ carteira }: EconomiaChartProps) {
    const totalVisitors = carteira.total_receitas + carteira.total_despesas;

    const chartData = [
        {
            desktop: carteira.total_receitas,
            mobile: carteira.total_despesas,
        },
    ];
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
        >
            <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) - 16}
                                            className="fles items-center gap-1"
                                        >
                                            <tspan className="mr-1 mt-1 text-sm font-normal opacity-70">
                                                R$
                                            </tspan>
                                            <tspan className="shrink-0 text-lg font-semibold">
                                                2.100,00
                                            </tspan>
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 4}
                                            className="fill-muted"
                                        >
                                            Visitors
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </PolarRadiusAxis>
                <RadialBar
                    dataKey="desktop"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-desktop)"
                    className="stroke-transparent stroke-2"
                />
                <RadialBar
                    dataKey="mobile"
                    fill="var(--color-mobile)"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                />
            </RadialBarChart>
        </ChartContainer>
    );
}
