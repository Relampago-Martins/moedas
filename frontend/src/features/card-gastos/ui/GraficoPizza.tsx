'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Categoria } from '@/types/models/categoria';
import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { GastosContext } from '../lib/context';
import { calcColor } from '../lib/index';
import './style.scss';
import { FatiaAtiva, FatiaInativa } from './utils/GraphFatia';

export type GraficoPizzaProps = {
    className?: string;
    categorias: Categoria[];
};

export function GraficoPizza({ categorias }: GraficoPizzaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);
    const [activeIndex, setActiveIndex] = useState(-1);

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
                    animationBegin={0}
                    animationDuration={800}
                    animationEasing="ease-out"
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
                <motion.span
                    key={`total-gastos-${activeIndex}`}
                    transition={{
                        type: 'spring',
                        duration: 0.3,
                        bounce: 0,
                    }}
                    initial={{ opacity: 0.9, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    className=" text-sm font-bold text-gray-500"
                >
                    {activeIndex < 0 ? (
                        numberToCurrency(
                            categorias.reduce(
                                (acc, curr) => acc + curr.total_gastos,
                                0,
                            ),
                        )
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <i
                                className={`${categoriaSelecionada?.icone} text-4xl`}
                            />
                            {numberToCurrency(
                                categoriaSelecionada?.total_gastos || 0,
                            )}
                        </div>
                    )}
                </motion.span>
            </div>
        </div>
    );
}
