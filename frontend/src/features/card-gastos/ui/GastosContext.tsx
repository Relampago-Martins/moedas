'use client';
import { Despesa } from '@/types/models/despesa';
import { ReactNode, useState } from 'react';
import { Categoria, categorias, getGastosPorCategoria } from '../lib';
import { GastosContext as Context } from '../lib/context';

type GastosConteudoProps = {
    children?: ReactNode;
};

export function GastosContext({ children }: GastosConteudoProps) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<
        Categoria['nome'] | 'todos'
    >('todos');
    const [gastos, setGastos] = useState<Despesa[]>([]);

    return (
        <Context.Provider
            value={{
                categoriaSelecionada,
                setCategoriaSelecionada,
                gastos,
                setGastos,
                getGastosPorCategoria: () =>
                    getGastosPorCategoria(gastos, categorias),
            }}
        >
            {children}
        </Context.Provider>
    );
}
