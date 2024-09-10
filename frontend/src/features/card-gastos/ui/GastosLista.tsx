'use client';
import { getDespesas } from '@/shared/api/endpoints/despesa-cli';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { Categoria } from '../lib';
import { GastosContext } from '../lib/context';
import { ItemGasto } from './item-gasto';

type GastosListaProps = {
    categorias: Categoria[];
};

export function GastosLista({ categorias }: GastosListaProps) {
    const { categoriaSelecionada, gastos, setGastos } =
        useContext(GastosContext);

    useEffect(() => {
        getDespesas().then((despesas) => {
            setGastos(despesas);
        });
    }, []);

    console.log(gastos);

    return (
        <div className=" flex-col gap-4">
            <ScrollArea className="h-44 pr-3">
                <div className="flex w-52 flex-col gap-3">
                    <AnimatePresence>
                        {gastos
                            .filter(
                                (gasto) =>
                                    categoriaSelecionada === 'todos' ||
                                    gasto.categoria.value ===
                                        categoriaSelecionada,
                            )
                            .map((gasto) => (
                                <ItemGasto
                                    key={`${gasto.categoria}-${gasto.descricao}`}
                                    gasto={gasto}
                                />
                            ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}
