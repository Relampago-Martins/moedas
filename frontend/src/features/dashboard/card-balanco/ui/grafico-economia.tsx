'use client';
import { Carteira } from '@/types/models';
import { Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { getColor } from '../lib/utils';
import './ui.scss';

type GraficoEconomiaProps = {
    carteira: Carteira;
};

export function GraficoEconomia({ carteira }: GraficoEconomiaProps) {
    const [startAngle, endAngle] =
        carteira.percentualEconomia > 100
            ? [0, 360]
            : [90, 90 - (360 * carteira.percentualEconomia) / 100];

    return (
        <div className="relative shrink-0 grow">
            <PieChart width={80} height={80}>
                <Pie
                    data={[{ value: 100 }]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    activeIndex={0}
                    activeShape={Fatia}
                    innerRadius={25}
                    shapeRendering={'geometricPrecision'}
                    outerRadius={40}
                    fill={getColor(carteira.percentualEconomia)}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    cornerRadius={5}
                    isAnimationActive
                ></Pie>
            </PieChart>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">
                    {carteira.percentualEconomia.toFixed(0)}
                </span>
                <span className="ml-[2px] text-xs">%</span>
            </div>
        </div>
    );
}

export const Fatia = (props: PieSectorDataItem) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
        props;

    return (
        <Sector
            cx={cx}
            cy={cy}
            cornerRadius={5}
            fill={fill}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
        />
    );
};
