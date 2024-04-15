'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { GastosContext } from '../lib/context';
import { Categoria, calcColor } from '../lib/index';
import { FatiaAtiva, FatiaInativa } from './GraphFatia';
import { IconeGasto } from './IconeGasto';
import './style.scss';

export type GraficoPizzaProps = {
    data: { categoria: Categoria; valor: number }[];
    className?: string;
};

export function GraficoPizza({ data }: GraficoPizzaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);
    const [activeIndex, setActiveIndex] = useState(-1);
    const onPieClick = useCallback(
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
        <div className="relative h-fit">
            <PieChart width={250} height={250} className="z-10 -mx-3">
                <Pie
                    data={data}
                    dataKey="valor"
                    activeIndex={activeIndex}
                    activeShape={FatiaAtiva}
                    inactiveShape={FatiaInativa}
                    shapeRendering={'geometricPrecision'}
                    innerRadius={60}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                    isAnimationActive={true}
                    onClick={(_, index) => onPieClick(index, activeIndex)}
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
            </PieChart>
            <div className="absolute inset-0 z-[0] flex select-none flex-col items-center justify-center gap-1">
                {activeIndex < 0 ? (
                    <span className=" text-sm font-bold text-gray-500">
                        {numberToCurrency(
                            data.reduce((acc, curr) => acc + curr.valor, 0),
                        )}
                    </span>
                ) : (
                    <>
                        <IconeGasto
                            iconeName={data[activeIndex].categoria.icone}
                            width={35}
                            height={35}
                            style={{
                                color: calcColor(
                                    data[activeIndex].categoria.cor,
                                    false,
                                ),
                            }}
                        />
                        <span
                            className="text-center text-sm font-normal"
                            style={{
                                color: calcColor(
                                    data[activeIndex].categoria.cor,
                                    false,
                                ),
                            }}
                        >
                            {numberToCurrency(data[activeIndex].valor)}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
