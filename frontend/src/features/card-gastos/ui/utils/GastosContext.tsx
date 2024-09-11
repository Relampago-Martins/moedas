'use client';
import { Categoria } from '@/types/models/categoria';
import { ReactNode, useState } from 'react';
import { GastosContext as Context } from '../../lib/context';

type GastosConteudoProps = {
    children?: ReactNode;
};

export function GastosContext({ children }: GastosConteudoProps) {
    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState<Categoria>();

    return (
        <Context.Provider
            value={{
                categoriaSelecionada,
                setCategoriaSelecionada,
            }}
        >
            {children}
        </Context.Provider>
    );
}
