'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from '@/shared/ui/select';

import { useContext } from 'react';
import { Categoria } from '../lib';
import { GastosContext } from '../lib/context';

type SelectCategoriaProps = {
    categorias: Categoria[];
};

export function SelectCategoria({ categorias }: SelectCategoriaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);

    return (
        <Select
            value={categoriaSelecionada}
            onValueChange={setCategoriaSelecionada}
        >
            <SelectTrigger>
                {
                    <TriggerContent
                        categoria={categorias.find(
                            (categoria) =>
                                categoria.nome === categoriaSelecionada,
                        )}
                    />
                }
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="todos">Todas categorias</SelectItem>
                    {categorias.map((categoria) => (
                        <SelectItem key={categoria.nome} value={categoria.nome}>
                            {categoria.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

type ItemGastoProps = {
    categoria: Categoria | undefined;
};
function TriggerContent({ categoria }: ItemGastoProps) {
    return (
        <div className="flex items-center gap-2">
            {categoria?.icone}
            <span>{categoria ? categoria.label : 'Todas categorias'}</span>
        </div>
    );
}
