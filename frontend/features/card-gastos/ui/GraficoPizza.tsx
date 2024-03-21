'use client';
import { useCallback, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { Categoria, gastos, map_catergotia_cor } from '../lib/index';
import { renderActiveShape } from './GraphShape';

export type GraficoPizzaProps = {
    className?: string;
};

export function GraficoPizza({ className }: GraficoPizzaProps) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [selected, setSelected] = useState(false);
    const onPieEnter = useCallback(
        (_: any, index: number) => {
            setActiveIndex(index);
            console.log('index', index);
        },
        [setActiveIndex],
    );

    return (
        <PieChart width={200} height={200} className="-mx-3">
            <Pie
                data={gastos}
                dataKey="value"
                fill={'#8884d8'}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                startAngle={90}
                endAngle={-270}
                innerRadius={40}
                outerRadius={80}
                isAnimationActive={true}
                onMouseEnter={onPieEnter}
                onMouseLeave={() => setActiveIndex(-1)}
            >
                {gastos.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={calcColor(
                            entry.categoria,
                            activeIndex >= 0 && activeIndex !== index,
                        )}
                    />
                ))}
            </Pie>
            <div>pow</div>
        </PieChart>
    );
}

function calcColor(categoria: Categoria, isActive: boolean) {
    if (isActive) {
        //make the color has less opacity
        return map_catergotia_cor[categoria] + '80';
    }
    return map_catergotia_cor[categoria];
}
