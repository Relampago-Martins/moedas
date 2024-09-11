'use client';
import { Categoria } from '@/types/models/categoria';
import { Despesa } from '@/types/models/despesa';
import { ReactNode, useState } from 'react';
import { GastosContext as Context } from '../../lib/context';

type GastosConteudoProps = {
    children?: ReactNode;
};

export function GastosContext({ children }: GastosConteudoProps) {
    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState<Categoria>();
    const [despesas, setDespesas] = useState<Despesa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    return (
        <Context.Provider
            value={{
                categoriaSelecionada,
                setCategoriaSelecionada,
                despesas,
                setDespesas,
                categorias,
                setCategorias,
            }}
        >
            {children}
        </Context.Provider>
    );
}
