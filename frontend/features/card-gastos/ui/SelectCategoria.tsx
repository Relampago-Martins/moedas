'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/shared/ui/select';

import { numberToCurrency } from '@/shared/lib/utils';
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
            <SelectTrigger>
                <TriggerContent
                    categoria={gastoCategoriaSelecionada?.categoria}
                    valorTotal={gastoCategoriaSelecionada?.valor || 0}
                />
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
    valorTotal: number;
};
function TriggerContent({ categoria, valorTotal }: ItemGastoProps) {
    return (
        <div className="flex items-center justify-start gap-2">
            <div style={{ color: categoria ? categoria.cor : 'inherit' }}>
                {IconeGasto(categoria?.icone || '')}
            </div>
            <span>{categoria ? categoria.label : 'Todas categorias'}</span>
            {numberToCurrency(valorTotal)}
            <Icon asChild>
                <ChevronDown className="h-4 w-4 opacity-50" />
            </Icon>
        </div>
    );
}
