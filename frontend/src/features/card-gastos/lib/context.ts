import { Despesa } from "@/types/models/despesa";
import { createContext } from "react";
import { Categoria } from ".";

type GastosContext = {
    categoriaSelecionada: Categoria['nome'] | 'todos';
    setCategoriaSelecionada: (categoria: Categoria['nome'] | 'todos') => void;
    gastos: Despesa[];
    setGastos: (gastos: Despesa[]) => void;
    getGastosPorCategoria: () => {
        categoria : Categoria;
        valor: number;
    }[];
}


export const GastosContext = createContext<GastosContext>({
    categoriaSelecionada: 'todos',
    gastos: [],
    setGastos: () => {},
    setCategoriaSelecionada: () => {},
    getGastosPorCategoria: () => [],
});