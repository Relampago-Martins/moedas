import { createContext } from "react";

type MovimentacaoContext = {
    movimentacaoSelecionada?: {
        id: number;
        tipo: string;
    },
    setMovimentacaoSelecionada: React.Dispatch<React.SetStateAction<{
        id: number;
        tipo: string;
    } | undefined>>
}

export const MovimentacaoContext = createContext<MovimentacaoContext>({
    movimentacaoSelecionada: undefined,
    setMovimentacaoSelecionada: () => {}
});