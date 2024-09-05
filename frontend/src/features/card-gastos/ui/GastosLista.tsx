'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useMemo } from 'react';
import { Categoria, Gasto } from '../lib';
import { GastosContext } from '../lib/context';

type GastosListaProps = {
    gastos: Gasto[];
    categorias: Categoria[];
};

export function GastosLista({ gastos, categorias }: GastosListaProps) {
    const { categoriaSelecionada } = useContext(GastosContext);
    const gastosOrdendos = useMemo(() => {
        return gastos
            .sort((a, b) => b.valor - a.valor)
            .map((gasto) => ({
                ...gasto,
                categoria: categorias.find(
                    (categoria) => categoria.nome === gasto.categoria,
                ),
            }));
    }, [gastos, categorias]);

    return (
        <div className=" flex-col gap-4">
            <ScrollArea className="h-44 pr-3">
                <div className="flex w-52 flex-col gap-3">
                    <AnimatePresence>
                        {gastosOrdendos
                            .filter(
                                (gasto) =>
                                    categoriaSelecionada === 'todos' ||
                                    gasto.categoria?.nome ===
                                        categoriaSelecionada,
                            )
                            .map((gasto) => (
                                <ItemGasto
                                    key={`${gasto.categoria?.nome}-${gasto.nome}`}
                                    gasto={gasto}
                                />
                            ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}

type ItemGastoProps = {
    gasto: {
        categoria: Categoria | undefined;
        nome: string;
        valor: number;
    };
};

function ItemGasto({ gasto }: ItemGastoProps) {
    return (
        <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            layoutId={`${gasto.categoria?.nome}-${gasto.nome}`}
            className="flex w-full flex-col items-start rounded-sm border-l-4 bg-card px-4 py-2 "
            style={{ borderColor: gasto.categoria?.cor }}
            onMouseOver={(event) => {
                if (gasto.categoria) {
                    event.currentTarget.style.backgroundColor =
                        gasto.categoria.cor + '15';
                }
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'var(--card)';
            }}
        >
            <div className="w-full truncate text-start text-base">
                {gasto.nome}
            </div>
            <div className="text-sm opacity-70">
                {numberToCurrency(gasto.valor)}
            </div>
        </motion.button>
    );
}
