import { Categoria, CategoriaTotalMov } from "@/types/models/categoria";
import { createContext } from "react";

type GastosContext = {
    categoriaSelecionada: CategoriaTotalMov | undefined;
    setCategoriaSelecionada: (categoria?: Categoria) => void;
}

export const GastosContext = createContext<GastosContext>({
    categoriaSelecionada: undefined,
    setCategoriaSelecionada: () => {},
});