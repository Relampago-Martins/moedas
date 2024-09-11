import { Categoria } from "@/types/models/categoria";
import { Despesa } from "@/types/models/despesa";
import { createContext } from "react";

type GastosContext = {
    categoriaSelecionada: Categoria | undefined;
    setCategoriaSelecionada: (categoria?: Categoria) => void;
    despesas: Despesa[];
    setDespesas: (gastos: Despesa[]) => void;
    categorias: Categoria[];
    setCategorias: (categorias: Categoria[]) => void;
}

export const GastosContext = createContext<GastosContext>({
    categoriaSelecionada: undefined,
    setCategoriaSelecionada: () => {},
    despesas: [],
    setDespesas: () => {},
    categorias: [],
    setCategorias: () => {},
});