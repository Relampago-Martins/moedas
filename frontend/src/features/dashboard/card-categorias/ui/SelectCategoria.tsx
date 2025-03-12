'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/shared/ui/select';

import { Categoria, CategoriaTotalMov } from '@/types/models/categoria';
import { Icon, SelectTrigger } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';

type SelectCategoriaProps = {
    categorias: CategoriaTotalMov[];
};

export function SelectCategoria({ categorias }: SelectCategoriaProps) {
    const { categoriaSelecionada, setCategoriaSelecionada } =
        useContext(GastosContext);

    const gastosTotais = categorias.reduce(
        (acc, categoria) => acc + categoria.total_movimentacoes,
        0,
    );

    return (
        <Select
            value={categoriaSelecionada?.sigla || 'todos'}
            onValueChange={(value) => {
                setCategoriaSelecionada(
                    categorias.find((categoria) => categoria.sigla === value),
                );
            }}
        >
            <SelectTrigger className="flex select-none items-center justify-between">
                <TriggerContent
                    categoria={categoriaSelecionada}
                    porcentagem={
                        categoriaSelecionada
                            ? categoriaSelecionada.total_movimentacoes /
                              gastosTotais
                            : 1
                    }
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="todos">---</SelectItem>
                    {categorias.map((categoria) => (
                        <SelectItem
                            key={categoria.sigla}
                            value={categoria.sigla}
                            icon={
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{ backgroundColor: categoria.cor }}
                                />
                            }
                        >
                            {categoria.nome}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

type TriggerContentProps = {
    categoria: Categoria | undefined;
    porcentagem: number;
};
function TriggerContent({ categoria, porcentagem }: TriggerContentProps) {
    return (
        <>
            <div className="flex items-center gap-2">
                <span className="font-medium">
                    {categoria ? categoria.nome : 'Total'}
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
