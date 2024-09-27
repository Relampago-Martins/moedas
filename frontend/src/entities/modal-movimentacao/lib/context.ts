import { createContext } from "react";

type MovimentacaoContext = {
    movimentacaoSelecionada?: {
        id: number;
        tipo: string;
    },
    setMovimentacaoSelecionada: (movimentacao?: { id: number, tipo: string }) => void;
}

export const MovimentacaoContext = createContext<MovimentacaoContext>({
    movimentacaoSelecionada: undefined,
    setMovimentacaoSelecionada: () => {}
});