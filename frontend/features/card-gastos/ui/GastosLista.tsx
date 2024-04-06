'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { useContext, useMemo } from 'react';
import { MagicMotion } from 'react-magic-motion';
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
        <div className="flex w-52 flex-col gap-4">
            <ScrollArea className="h-60 pr-3">
                <MagicMotion>
                    <div className="flex flex-col gap-3">
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
                    </div>
                </MagicMotion>
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
        <Button
            variant={'ghost'}
            className="flex flex-col items-start rounded-sm border-l-4 px-4 py-6"
            style={{ borderColor: gasto.categoria?.cor }}
            onMouseOver={(event) => {
                event.currentTarget.style.backgroundColor = gasto.categoria
                    ? gasto.categoria.cor + '15'
                    : 'transparent';
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            <div className="text-base font-medium">{gasto.nome}</div>
            <div className="text-sm opacity-70">
                {numberToCurrency(gasto.valor)}
            </div>
        </Button>
    );
}
