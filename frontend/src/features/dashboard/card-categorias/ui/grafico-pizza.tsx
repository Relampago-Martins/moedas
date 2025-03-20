'use client';
import { CategoriaTotalMov } from '@/types/models/categoria';
import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { GastosContext } from '../lib/context';
import './style.scss';
import { FatiaAtiva, FatiaInativa } from './utils/GraphFatia';

export type GraficoPizzaProps = {
    className?: string;
    categorias: CategoriaTotalMov[];
};

export function GraficoPizza({ categorias }: GraficoPizzaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);
    const [activeIndex, setActiveIndex] = useState(-1);
    const activeIndexList = [activeIndex];
    useEffect(() => {
        categorias.forEach((entry, index) => {
            if (entry.sigla === categoriaSelecionada?.sigla) {
                setActiveIndex(index);
            }
            if (categoriaSelecionada === undefined) {
                setActiveIndex(-1);
            }
        });
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

    useEffect(() => {
        setCategoriaSelecionada();
    }, [categorias]);

    return (
        <div className="relative">
            <PieChart
                width={180}
                height={180}
                className="z-[1] -mx-3"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <Pie
                    data={categorias}
                    dataKey="total_movimentacoes"
                    activeIndex={activeIndexList}
                    activeShape={FatiaAtiva}
                    inactiveShape={FatiaInativa}
                    shapeRendering={'geometricPrecision'}
                    innerRadius={45}
                    outerRadius={80}
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
                            fill={
                                activeIndex >= 0 && activeIndex !== index
                                    ? entry.cor.fundo_com_opacidade
                                    : entry.cor.texto
                            }
                        />
                    ))}
                </Pie>
            </PieChart>

            <div className="absolute inset-0 z-[0] flex select-none flex-col items-center justify-center gap-1">
                <motion.span
                    key={`total-gastos-${categoriaSelecionada?.sigla}`}
                    transition={{
                        type: 'spring',
                        duration: 0.3,
                        bounce: 0.2,
                    }}
                    initial={{ opacity: 0.9, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className=" text-sm font-bold text-gray-500"
                >
                    {activeIndex < 0 ? (
                        <div className="flex flex-col items-center">
                            <i className="ph-bold ph-trend-down text-3xl text-foreground" />
                        </div>
                    ) : (
                        <div
                            className="flex flex-col items-center"
                            style={{
                                color: categoriaSelecionada?.cor.texto,
                            }}
                        >
                            <div className="text-2xl">
                                {categoriaSelecionada?.percentual.toFixed(0)}
                                <span className="ml-[2px] text-sm">%</span>
                            </div>
                        </div>
                    )}
                </motion.span>
            </div>
        </div>
    );
}
