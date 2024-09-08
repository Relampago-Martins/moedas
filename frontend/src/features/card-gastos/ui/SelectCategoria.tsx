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

type SelectCategoriaProps = {
    categorias: Categoria[];
};

export function SelectCategoria({ categorias }: SelectCategoriaProps) {
    const {
        categoriaSelecionada,
        setCategoriaSelecionada,
        gastosPorCategoria,
    } = useContext(GastosContext);
    const gastoCategoriaSelecionada = gastosPorCategoria.find(
        (gasto) => gasto.categoria.nome === categoriaSelecionada,
    );
    const totalGastos = gastosPorCategoria.reduce(
        (acc, gasto) => acc + gasto.valor,
        0,
    );
    return (
        <Select
            value={categoriaSelecionada}
            onValueChange={setCategoriaSelecionada}
        >
            <SelectTrigger className="flex select-none items-center justify-between">
                <TriggerContent
                    categoria={gastoCategoriaSelecionada?.categoria}
                    porcentagem={
                        (gastoCategoriaSelecionada?.valor || totalGastos) /
                        totalGastos
                    }
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="todos">---</SelectItem>
                    {categorias.map((categoria) => (
                        <SelectItem
                            key={categoria.nome}
                            value={categoria.nome}
                            icon={
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{ backgroundColor: categoria.cor }}
                                />
                            }
                        >
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
    porcentagem: number;
};
function TriggerContent({ categoria, porcentagem }: ItemGastoProps) {
    return (
        <>
            <div className="flex items-center gap-2">
                <span className="font-medium">
                    {categoria ? categoria.label : 'Total'}
                </span>
                <span className="text-xs">•</span>
                <span>{`${(porcentagem * 100).toFixed(0)}%`}</span>
            </div>
            <Icon asChild>
                <ChevronDown className="h-4 w-4" />
            </Icon>
        </>
    );
}
