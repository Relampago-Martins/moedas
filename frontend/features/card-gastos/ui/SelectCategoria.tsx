'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/shared/ui/select';

import { Icon, SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { Categoria } from '../lib';
import { GastosContext } from '../lib/context';
import { IconeGasto } from './IconeGasto';

type SelectCategoriaProps = {
    categorias: Categoria[];
    gastosPorCategoria: {
        categoria: Categoria;
        valor: number;
    }[];
};

export function SelectCategoria({
    categorias,
    gastosPorCategoria,
}: SelectCategoriaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);
    const gastoCategoriaSelecionada = gastosPorCategoria.find(
        (gasto) => gasto.categoria.nome === categoriaSelecionada,
    );
    return (
        <Select
            value={categoriaSelecionada}
            onValueChange={setCategoriaSelecionada}
        >
            <SelectTrigger className="flex select-none items-center justify-between">
                <TriggerContent
                    categoria={gastoCategoriaSelecionada?.categoria}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="todos">---</SelectItem>
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
    const iconeGasto = IconeGasto(categoria?.icone);

    return (
        <>
            <div className="flex items-center gap-2">
                {iconeGasto ? (
                    <div
                        style={{ color: categoria ? categoria.cor : 'inherit' }}
                    >
                        {iconeGasto}
                    </div>
                ) : null}
                <span className="font-medium">
                    {categoria ? categoria.label : 'Total'}
                </span>
            </div>
            <Icon asChild>
                <ChevronDown className="h-4 w-4" />
            </Icon>
        </>
    );
}
