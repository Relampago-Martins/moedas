'use client';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { GastosContext } from '../lib/context';
import { Categoria, calcColor } from '../lib/index';
import { renderActiveShape } from './GraphShape';

export type GraficoPizzaProps = {
    data: { categoria: Categoria; valor: number }[];
    className?: string;
};

export function GraficoPizza({ data }: GraficoPizzaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);
    const [activeIndex, setActiveIndex] = useState(-1);
    const onPieEnter = useCallback(
        (_: any, index: number) => {
            setActiveIndex(index);
            setCategoriaSelecionada(data[index].categoria.nome);
        },
        [setActiveIndex],
    );
    useEffect(() => {
        let indexSelected = -1;
        data.forEach((entry, index) => {
            if (entry.categoria.nome === categoriaSelecionada) {
                indexSelected = index;
            }
        });
        setActiveIndex(indexSelected);
    }, [categoriaSelecionada]);

    return (
        <PieChart width={200} height={200} className="-mx-3">
            <Pie
                data={data}
                dataKey="valor"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={true}
                onFocus={onPieEnter}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={calcColor(
                            entry.categoria.cor,
                            activeIndex >= 0 && activeIndex !== index,
                        )}
                    />
                ))}
            </Pie>
            <div>pow</div>
        </PieChart>
    );
}
