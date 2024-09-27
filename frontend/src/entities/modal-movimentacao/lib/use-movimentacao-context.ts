import { useContext } from "react";
import { MovimentacaoContext } from "./context";

export function useMovimentacaoContext() {
    return useContext(MovimentacaoContext);
}