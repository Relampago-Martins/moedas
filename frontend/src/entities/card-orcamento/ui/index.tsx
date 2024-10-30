import { numberToCurrency } from '@/shared/lib/utils';
import { SchoolBusIcon } from '@/shared/ui/huge-icons/categorias';
import { Progress } from '@/shared/ui/progress';
import { Categoria } from '@/types/models/categoria';
import { ChevronDown } from 'lucide-react';

type CardOrcamentoProps = {
    categoria: Categoria;
    nome: string;
    valorGasto: number;
    valorLimite: number;
};

export function CardOrcamento({ categoria, ...props }: CardOrcamentoProps) {
    const progressoPorcentagem = (props.valorGasto / props.valorLimite) * 100;
    return (
        <div className="flex w-[400px] flex-col gap-2 rounded-md border-[1px] border-border px-4 py-2">
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
                <Progress value={progressoPorcentagem} className="h-3" />
                <span className="text-sm text-muted">
                    {progressoPorcentagem}%
                </span>
            </div>
        </div>
    );
}
