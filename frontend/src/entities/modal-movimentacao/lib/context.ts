import { Movimentacao } from '@/types/models/movimentacao';
import { createContext } from 'react';

export type MovimentacaoSelecionada = {
    id: number;
    tipo: string;
    /** `id` do item de onde o modal sai, para o morph item → modal. */
    origemId?: string;
};

type MovimentacaoContext = {
    movimentacaoSelecionada?: MovimentacaoSelecionada;
    setMovimentacaoSelecionada: React.Dispatch<
        React.SetStateAction<MovimentacaoSelecionada | undefined>
    >;
    movimentacoes: Movimentacao[];
    setMovimentacoes: React.Dispatch<React.SetStateAction<Movimentacao[]>>;
};

export const MovimentacaoContext = createContext<MovimentacaoContext>({
    movimentacaoSelecionada: undefined,
    setMovimentacaoSelecionada: () => {},
    movimentacoes: [],
    setMovimentacoes: () => {},
});
