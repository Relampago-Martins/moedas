'use client';
import { Carteira } from '@/types/models';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

type GraficoBalancoProps = {
    carteira: Carteira;
};

export function GraficoBalanco({ carteira }: GraficoBalancoProps) {
    return (
        <ResponsiveContainer width={80} height={117} className="-mx-2">
            <BarChart data={[carteira]}>
                {/* <Legend radius={10} /> */}
                <Bar
                    dataKey="total_receitas"
                    fill="#16a34a"
                    radius={[8, 8, 0, 0]}
                />
                <Bar
                    dataKey="total_despesas"
                    fill="#e11d48"
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
