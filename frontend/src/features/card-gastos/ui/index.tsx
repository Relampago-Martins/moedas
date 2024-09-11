import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { getDespesas } from '@/shared/api/endpoints/despesa-cli';
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
    const categorias = await getCategorias().then((categorias) =>
        categorias.filter((c) => c.total_gastos > 0),
    );
    const despesas = await getDespesas();

    return (
        <Card title="Despesas" className={className}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 opacity-70">
                <BsReceipt className="text-lg" />
                <span className="text-base font-semibold">Despesas</span>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-4">
                <GastosContext>
                    <GraficoPizza categorias={categorias} />
                    <div className="flex flex-col gap-4">
                        <SelectCategoria categorias={categorias} />
                        <GastosLista despesas={despesas} />
                    </div>
                </GastosContext>
            </CardContent>
        </Card>
    );
}
