'use client';

import { Movimentacao } from '@/types/models/movimentacao';
import { useState } from 'react';
import {
    MovimentacaoContext,
    type MovimentacaoSelecionada,
} from '../lib/context';

type MovimentacaoProviderProps = {
    children?: React.ReactNode;
};
export function MovimentacaoProvider({ children }: MovimentacaoProviderProps) {
    const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState<
        MovimentacaoSelecionada | undefined
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
