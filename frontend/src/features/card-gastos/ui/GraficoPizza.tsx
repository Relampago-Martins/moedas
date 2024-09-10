'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { GastosContext } from '../lib/context';
import { calcColor } from '../lib/index';
import { FatiaAtiva, FatiaInativa } from './GraphFatia';
import './style.scss';

export type GraficoPizzaProps = {
    className?: string;
};

export function GraficoPizza({}: GraficoPizzaProps) {
    const {
        categoriaSelecionada,
        setCategoriaSelecionada,
        getGastosPorCategoria,
    } = useContext(GastosContext);
    const [activeIndex, setActiveIndex] = useState(-1);
    const gastosPorCategoria = getGastosPorCategoria();
    const onPieClick = useCallback(
        (newIndex: number, oldIndex: number) => {
            if (oldIndex === newIndex) {
                setActiveIndex(-1);
                setCategoriaSelecionada('todos');
                return;
            }
            setActiveIndex(newIndex);
            setCategoriaSelecionada(
                getGastosPorCategoria()[newIndex].categoria.nome,
            );
        },
        [setActiveIndex],
    );
    useEffect(() => {
        let indexSelected = -1;
        gastosPorCategoria.forEach((entry, index) => {
            if (entry.categoria.nome === categoriaSelecionada) {
                indexSelected = index;
            }
        });
        setActiveIndex(indexSelected);
    }, [categoriaSelecionada]);
    return (
        <div className="relative h-fit">
            <PieChart width={250} height={250} className="z-[1] -mx-3">
                <Pie
                    data={gastosPorCategoria}
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
                    onClick={(data, index) => {
                        console.log('data', data, 'index', index);
                        onPieClick(index, activeIndex);
                    }}
                >
                    {gastosPorCategoria.map((entry, index) => (
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
                            gastosPorCategoria.reduce(
                                (acc, curr) => acc + curr.valor,
                                0,
                            ),
                        )}
                    </span>
                ) : (
                    <span
                        className="text-center text-sm font-normal"
                        style={{
                            color: calcColor(
                                gastosPorCategoria[activeIndex].categoria.cor,
                                false,
                            ),
                        }}
                    >
                        {numberToCurrency(
                            gastosPorCategoria[activeIndex].valor,
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}
