'use client';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { gastos, map_catergotia_cor } from '../lib/index';

export type GraficoPizzaProps = {
    className?: string;
};

export function GraficoPizza({ className }: GraficoPizzaProps) {
    return (
        <ResponsiveContainer width={200} height={200}>
            <PieChart>
                <Pie
                    data={gastos}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    fill={'#8884d8'}
                    startAngle={90}
                    endAngle={-270}
                    isAnimationActive={false}
                >
                    {gastos.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={map_catergotia_cor[entry.categoria]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
