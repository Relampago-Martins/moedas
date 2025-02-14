import { Movimentacao } from "@/types/models/movimentacao";
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
    movimentacoes: Movimentacao[];
    setMovimentacoes: React.Dispatch<React.SetStateAction<Movimentacao[]>>;
}

export const MovimentacaoContext = createContext<MovimentacaoContext>({
    movimentacaoSelecionada: undefined,
    setMovimentacaoSelecionada: () => {},
    movimentacoes: [],
    setMovimentacoes: () => {},
});
