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
        (newIndex: number, oldIndex: number) => {
            if (oldIndex === newIndex) {
                setActiveIndex(-1);
                setCategoriaSelecionada('todos');
                return;
            }
            setActiveIndex(newIndex);
            setCategoriaSelecionada(data[newIndex].categoria.nome);
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
                shapeRendering={'geometricPrecision'}
                // make it a donut chart
                innerRadius={35}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={true}
                onFocus={(_, index) => onPieEnter(index, activeIndex)}
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        onMouseOver={(event) => {
                            event.currentTarget.style.cursor = 'pointer';
                        }}
                        fill={calcColor(
                            entry.categoria.cor,
                            activeIndex >= 0 && activeIndex !== index,
                        )}
                    />
                ))}
            </Pie>
        </PieChart>
    );
}
