'use client';
import { ItemGasto } from '@/entities/item-gasto.tsx/ui';
import { getDespesas } from '@/shared/api/endpoints/despesa-cli';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { GastosContext } from '../lib/context';

export function GastosLista() {
    const { categoriaSelecionada, despesas, setDespesas } =
        useContext(GastosContext);

    const despesasFiltradas = despesas.filter(
        (despesa) =>
            !categoriaSelecionada ||
            despesa.categoria.sigla === categoriaSelecionada.sigla,
    );
    useEffect(() => {
        getDespesas().then((despesas) => {
            setDespesas(despesas);
        });
    }, []);

    return (
        <div className=" flex-col gap-4">
            <ScrollArea className="h-44 pr-3">
                <div className="flex w-52 flex-col gap-3">
                    <AnimatePresence>
                        {despesasFiltradas.map((despesa) => (
                            <ItemGasto
                                key={despesa.id}
                                gasto={despesa}
                                prefixLayoutId="dashboard"
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}
