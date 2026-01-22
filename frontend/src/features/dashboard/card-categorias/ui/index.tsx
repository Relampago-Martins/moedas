import { getCategoriasTotalMovs } from '@/shared/api/endpoints/categoria-cli';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { TFiltroPeriodo } from '@/types/filters';
import { CategoriaValue } from './categoria-value';
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
    const gastosTotais = categorias.reduce(
        (acc, categoria) => acc + categoria.total_movimentacoes,
        0,
    );
    return (
        <Card title="Despesas" className={`flex flex-col ${className}`}>
            <CardHeader className="flex h-8 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted">
                <i className="ph ph-chart-donut flex text-lg text-muted" />

                <span className="text-sm">Categorias</span>
            </CardHeader>
            <CardContent className="flex h-full flex-col items-center gap-2 px-4">
                {categorias.length > 0 ? (
                    <GastosContext>
                        <div className="flex w-full items-center gap-4">
                            <GraficoPizza
                                categorias={categorias.toReversed()}
                            />
                            <CategoriaValue gastosTotais={gastosTotais} />
                        </div>
                        <ListaCategorias categorias={categorias} />
                    </GastosContext>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-1 text-muted">
                        <i className="ph-thin ph-trend-down text-7xl" />
                        <span className="text-base font-medium">
                            Sem despesa registrada
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
