'use client';
import { ReactNode, useState } from 'react';
import { Categoria } from '../lib';
import { GastosContext } from '../lib/context';

type GastosConteudoProps = {
    children?: ReactNode;
};

export function GastosConteudo({ children }: GastosConteudoProps) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<
        Categoria['nome'] | 'todos'
    >('todos');

    return (
        <GastosContext.Provider
            value={{ categoriaSelecionada, setCategoriaSelecionada }}
        >
            {children}
        </GastosContext.Provider>
    );
}
