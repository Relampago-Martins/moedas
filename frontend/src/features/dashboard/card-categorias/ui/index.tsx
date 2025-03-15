import { getCategoriasTotalMovs } from '@/shared/api/endpoints/categoria-cli';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { TFiltroPeriodo } from '@/types/filters';
import { GraficoPizza } from './grafico-pizza';
import { ListaCategorias } from './lista-categorias';
import { GastosContext } from './utils/GastosContext';

type CardGastosProps = {
    className?: string;
    params: TFiltroPeriodo;
};

export async function CardCategorias({ className, params }: CardGastosProps) {
    const categorias = await getCategoriasTotalMovs({
        ...params,
        tipo: 'D',
    });

    return (
        <Card title="Despesas" className={`flex flex-col ${className}`}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2 opacity-70">
                <i className="ph ph-chart-pie text-xl" />
                <span className="text-lg">Categorias</span>
            </CardHeader>
            <CardContent className="flex h-full flex-col items-center gap-4">
                {categorias.length > 0 ? (
                    <GastosContext>
                        <GraficoPizza categorias={categorias.toReversed()} />
                        <ListaCategorias categorias={categorias} />
                    </GastosContext>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
                        <i className="ph ph-chart-pie-slice text-6xl" />
                        <span className="text-sm ">
                            Nenhuma despesa registrada
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
