'use client';
import { Carteira } from '@/types/models';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { getColor } from '../lib/utils';
import './ui.scss';

type GraficoEconomiaProps = {
    carteira: Carteira;
};

export function GraficoEconomia({ carteira }: GraficoEconomiaProps) {
    const totalReceitas = carteira.total_receitas;
    const saldoRestante = totalReceitas - carteira.total_despesas;
    const percentual = (saldoRestante / totalReceitas) * 100;
    const [startAngle, endAngle] =
        percentual > 100 ? [0, 360] : [90, 90 - (360 * percentual) / 100];

    return (
        <div className="relative shrink-0 grow">
            <ResponsiveContainer width={80} height={80}>
                <PieChart>
                    <Pie
                        data={[{ value: 100 }]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        fill={getColor(percentual)}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        cornerRadius={5}
                        isAnimationActive={false}
                    ></Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">
                    {percentual.toFixed(0)}
                </span>
                <span className="ml-[2px] text-xs">%</span>
            </div>
        </div>
    );
}
