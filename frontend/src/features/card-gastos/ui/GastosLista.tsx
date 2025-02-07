'use client';
import { ItemMovimentacao } from '@/entities/movimentacoes/item-movimentacao/ui';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Despesa } from '@/types/models/despesa';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';

type GastosListaProps = {
    despesas: Despesa[];
};

export function GastosLista({ despesas }: GastosListaProps) {
    const { categoriaSelecionada } = useContext(GastosContext);
    const despesasFiltradas = despesas.filter(
        (despesa) =>
            !categoriaSelecionada ||
            despesa.categoria.sigla === categoriaSelecionada.sigla,
    );

    return (
        <div className=" flex-col gap-4">
            <ScrollArea className="h-44 pr-3">
                <div className="flex w-52 flex-col gap-3">
                    <AnimatePresence>
                        {despesasFiltradas.map((despesa) => (
                            <ItemMovimentacao
                                key={despesa.id}
                                gasto={{ ...despesa, tipo: 'D' }}
                                prefixLayoutId="dashboard"
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}
