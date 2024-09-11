'use client';
import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { numberToCurrency } from '@/shared/lib/utils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { GastosContext } from '../lib/context';
import { calcColor } from '../lib/index';
import './style.scss';
import { FatiaAtiva, FatiaInativa } from './utils/GraphFatia';

export type GraficoPizzaProps = {
    className?: string;
};

export function GraficoPizza({}: GraficoPizzaProps) {
    const {
        categoriaSelecionada,
        setCategoriaSelecionada,
        categorias,
        setCategorias,
    } = useContext(GastosContext);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        getCategorias().then((categorias) => {
            setCategorias(categorias.filter((c) => c.total_gastos > 0));
        });
    }, []);

    useEffect(() => {
        let indexSelected = -1;
        categorias.forEach((entry, index) => {
            if (entry.sigla === categoriaSelecionada?.sigla) {
                indexSelected = index;
            }
        });
        setActiveIndex(indexSelected);
    }, [categoriaSelecionada]);

    const onPieClick = useCallback(
        (newIndex: number, oldIndex: number) => {
            if (oldIndex === newIndex) {
                setActiveIndex(-1);
                setCategoriaSelecionada();
                return;
            }
            setActiveIndex(newIndex);
            setCategoriaSelecionada(categorias[newIndex]);
        },
        [activeIndex],
    );
    return (
        <div className="relative h-fit">
            <PieChart width={250} height={250} className="z-[1] -mx-3">
                <Pie
                    data={categorias}
                    dataKey="total_gastos"
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
                        onPieClick(index, activeIndex);
                    }}
                >
                    {categorias.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={calcColor(
                                entry.cor,
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
                            categorias.reduce(
                                (acc, curr) => acc + curr.total_gastos,
                                0,
                            ),
                        )}
                    </span>
                ) : (
                    <span
                        className="text-center text-sm font-normal"
                        style={{
                            color: calcColor(
                                categoriaSelecionada?.cor || '#000',
                                false,
                            ),
                        }}
                    >
                        {numberToCurrency(
                            categoriaSelecionada?.total_gastos || 0,
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}
