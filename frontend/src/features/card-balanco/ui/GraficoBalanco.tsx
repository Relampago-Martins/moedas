'use client';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { data } from '../lib/data';

export function GraficoBalanco() {
    return (
        <ResponsiveContainer width={80} height={117} className="-mx-2">
            <BarChart data={data}>
                {/* <Legend radius={10} /> */}
                <Bar dataKey="Receitas" fill="#16a34a" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Gastos" fill="#e11d48" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
