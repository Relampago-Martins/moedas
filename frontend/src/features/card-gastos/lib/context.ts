import { Categoria } from "@/types/models/categoria";
import { createContext } from "react";

type GastosContext = {
    categoriaSelecionada: Categoria | undefined;
    setCategoriaSelecionada: (categoria?: Categoria) => void;
}

export const GastosContext = createContext<GastosContext>({
    categoriaSelecionada: undefined,
    setCategoriaSelecionada: () => {},
});