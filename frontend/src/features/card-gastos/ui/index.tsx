import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { BsReceipt } from 'react-icons/bs';
import { GastosLista } from './GastosLista';
import { GraficoPizza } from './GraficoPizza';
import { SelectCategoria } from './SelectCategoria';
import { GastosContext } from './utils/GastosContext';

type CardGastosProps = {
    className?: string;
};

export async function CardGastos({ className }: CardGastosProps) {
    return (
        <Card title="Gastos" className={className}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 opacity-70">
                <BsReceipt className="text-lg" />
                <span className="text-base font-semibold">Despesas</span>
                {/* <BsChevronRight className="mt-0 self-center text-sm" /> */}
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4">
                <GastosContext>
                    <GraficoPizza />
                    <div className="flex flex-col gap-4">
                        <SelectCategoria />
                        <GastosLista />
                    </div>
                </GastosContext>
            </CardContent>
        </Card>
    );
}
