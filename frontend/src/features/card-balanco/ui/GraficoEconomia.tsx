import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { balancoMes } from '../lib/data';
import { getColor } from '../lib/utils';
import './ui.scss';

export function GraficoEconomia() {
    const totalReceitas = balancoMes.Receitas;
    const saldoRestante = totalReceitas - balancoMes.Gastos;
    const percentual = (saldoRestante / totalReceitas) * 100;
    const [startAngle, endAngle] =
        percentual > 100 ? [0, 360] : [90, 90 - (360 * percentual) / 100];

    return (
        <div className="relative">
            <ResponsiveContainer width={60} height={60}>
                <PieChart>
                    <Pie
                        data={[{ value: 100 }]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                        fill={getColor(percentual)}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        isAnimationActive={false}
                    ></Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-500">
                    {percentual.toFixed(0)}%
                </span>
            </div>
        </div>
    );
}
