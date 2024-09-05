'use client';
import { ReactNode, useState } from 'react';
import { Categoria } from '../lib';
import { GastosContext as Context } from '../lib/context';

type GastosConteudoProps = {
    children?: ReactNode;
};

export function GastosContext({ children }: GastosConteudoProps) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<
        Categoria['nome'] | 'todos'
    >('todos');

    return (
        <Context.Provider
            value={{ categoriaSelecionada, setCategoriaSelecionada }}
        >
            {children}
        </Context.Provider>
    );
}
