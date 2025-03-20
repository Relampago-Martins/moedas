import { CategoriaTotalMov } from "@/types/models/categoria";
import { createContext } from "react";

type GastosContext = {
    categoriaSelecionada: CategoriaTotalMov | undefined;
    setCategoriaSelecionada: (categoria?: CategoriaTotalMov) => void;
}

export const GastosContext = createContext<GastosContext>({
    categoriaSelecionada: undefined,
    setCategoriaSelecionada: () => {},
});