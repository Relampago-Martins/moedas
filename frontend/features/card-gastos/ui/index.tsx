import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { BsChevronRight, BsReceipt } from 'react-icons/bs';
import { categorias, gastos, getGastosPorCategoria } from '../lib';
import { GastosContext } from './GastosContext';
import { GastosLista } from './GastosLista';
import { GraficoPizza } from './GraficoPizza';
import { SelectCategoria } from './SelectCategoria';

type CardGastosProps = {
    className?: string;
};

export function CardGastos({ className }: CardGastosProps) {
    const gastosPorCategoria = getGastosPorCategoria(gastos, categorias);

    return (
        <Card title="Gastos" className={className}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 opacity-70">
                <BsReceipt className="text-lg" />
                <span className="text-base font-semibold">Gastos</span>
                <BsChevronRight className="mt-0 self-center text-sm" />
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4">
                <GastosContext>
                    <GraficoPizza data={gastosPorCategoria} />
                    <div className="flex flex-col gap-4">
                        <SelectCategoria
                            categorias={categorias}
                            gastosPorCategoria={gastosPorCategoria}
                        />
                        <GastosLista gastos={gastos} categorias={categorias} />
                    </div>
                </GastosContext>
            </CardContent>
        </Card>
    );
}
