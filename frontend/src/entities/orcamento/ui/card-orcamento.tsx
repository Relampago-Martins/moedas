'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Collapsible, CollapsibleContent } from '@/shared/ui/collapsible';
import { SchoolBusIcon } from '@/shared/ui/huge-icons/categorias';
import { Progress } from '@/shared/ui/progress';
import { Categoria } from '@/types/models/categoria';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type CardOrcamentoProps = {
    categoria: Categoria;
    nome: string;
    valorGasto: number;
    valorLimite: number;
};

export function CardOrcamento({ categoria, ...props }: CardOrcamentoProps) {
    const progressoPorcentagem = (props.valorGasto / props.valorLimite) * 100;
    const [open, setOpen] = useState(false);

    return (
        <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex min-w-[280px] grow cursor-pointer flex-col gap-2 rounded-lg border-[1px] border-border bg-card px-4 py-2"
        >
            <div className="flex items-center gap-3">
                <div className="relative overflow-hidden rounded-full p-2">
                    <SchoolBusIcon
                        className="h-6 w-6"
                        style={{ color: categoria.cor }}
                    />
                    <span
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundColor: categoria.cor,
                        }}
                    ></span>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base">{props.nome}</h1>
                    <h4 className="text-sm text-muted">
                        Restam{' '}
                        {numberToCurrency(props.valorLimite - props.valorGasto)}
                    </h4>
                </div>
                <ChevronDown className="ml-auto h-5 w-5 text-muted" />
            </div>
            <div className="flex items-center gap-4 ">
                <Progress value={progressoPorcentagem} className="h-2" />
                <span className="text-sm text-muted">
                    {progressoPorcentagem}%
                </span>
            </div>
            <Collapsible open={open} onOpenChange={() => setOpen(!open)}>
                <CollapsibleContent>
                    <div className="flex flex-row justify-between">
                        <span>Gasto</span>
                        <div className="flex items-center">
                            <span className="mr-1 text-sm text-muted">R$</span>
                            <span className="text-base">
                                {numberToCurrency(props.valorGasto)
                                    .replace('R$', '')
                                    .trim()}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Limite</span>
                        <div className="flex items-center">
                            <span className="mr-1 text-sm text-muted">R$</span>
                            <span className="text-base">
                                {numberToCurrency(props.valorLimite)
                                    .replace('R$', '')
                                    .trim()}
                            </span>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
