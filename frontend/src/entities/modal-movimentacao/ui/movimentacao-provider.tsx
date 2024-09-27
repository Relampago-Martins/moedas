'use client';

import { useState } from 'react';
import { MovimentacaoContext } from '../lib/context';

type MovimentacaoProviderProps = {
    children?: React.ReactNode;
};
export function MovimentacaoProvider({ children }: MovimentacaoProviderProps) {
    const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState<
        { id: number; tipo: string } | undefined
    >(undefined);

    return (
        <MovimentacaoContext.Provider
            value={{
                movimentacaoSelecionada,
                setMovimentacaoSelecionada,
            }}
        >
            {children}
        </MovimentacaoContext.Provider>
    );
}
