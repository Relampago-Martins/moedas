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
            <CardHeader className="flex h-10 shrink-0 flex-row items-center gap-2 border-b py-0 text-muted">
                <i className="ph ph-chart-pie text-xl" />
                <span className="">Categorias</span>
            </CardHeader>
            <CardContent className="flex h-full flex-col items-center gap-2 px-4 pt-2">
                {categorias.length > 0 ? (
                    <GastosContext>
                        <GraficoPizza categorias={categorias.toReversed()} />
                        <CategoriaValue gastosTotais={gastosTotais} />
                        <ListaCategorias categorias={categorias} />
                    </GastosContext>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-1 text-muted">
                        <i className="ph-thin ph-chart-pie-slice text-7xl" />
                        <span className="text-base font-medium">
                            Nenhuma despesa
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
