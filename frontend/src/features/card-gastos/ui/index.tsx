import { getCategorias } from '@/shared/api/endpoints/categoria-cli';
import { getDespesas } from '@/shared/api/endpoints/despesa-cli';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { PieChart02Icon } from '@/shared/ui/huge-icons';
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
        <Card title="Despesas" className={`flex flex-col ${className}`}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 opacity-70">
                <PieChart02Icon className="h-5 w-5" />
                <span className="text-base font-medium">
                    Despesas por Categoria
                </span>
            </CardHeader>
            <CardContent className="flex h-full flex-wrap justify-center gap-4">
                {despesas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                        <i className="ph ph-package text-3xl" />
                        <span>Nenhuma despesa cadastrada</span>
                    </div>
                ) : (
                    <GastosContext>
                        <GraficoPizza categorias={categorias} />
                        <div className="flex flex-col gap-4">
                            <SelectCategoria categorias={categorias} />
                            <GastosLista despesas={despesas} />
                        </div>
                    </GastosContext>
                )}
            </CardContent>
        </Card>
    );
}
