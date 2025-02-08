'use client';

import { Movimentacao } from '@/types/models/movimentacao';
import { useState } from 'react';
import { MovimentacaoContext } from '../lib/context';

type MovimentacaoProviderProps = {
    children?: React.ReactNode;
};
export function MovimentacaoProvider({ children }: MovimentacaoProviderProps) {
    const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState<
        { id: number; tipo: string } | undefined
    >(undefined);
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

    return (
        <MovimentacaoContext.Provider
            value={{
                movimentacaoSelecionada,
                setMovimentacaoSelecionada: (movimentacao) => {
                    setMovimentacaoSelecionada(movimentacao);
                },
                movimentacoes,
                setMovimentacoes,
            }}
        >
            {children}
        </MovimentacaoContext.Provider>
    );
}
