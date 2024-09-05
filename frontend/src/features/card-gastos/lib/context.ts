import { createContext } from "react";
import { Categoria } from ".";

type GastosContext = {
    categoriaSelecionada: Categoria['nome'] | 'todos';
    setCategoriaSelecionada: (categoria: Categoria['nome'] | 'todos') => void;
}


export const GastosContext = createContext<GastosContext>({
    categoriaSelecionada: 'todos',
    setCategoriaSelecionada: () => {},
});