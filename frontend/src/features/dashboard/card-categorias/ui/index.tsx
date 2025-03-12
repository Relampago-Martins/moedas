import { getCategoriasTotalMovs } from '@/shared/api/endpoints/categoria-cli';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { PieChart02Icon } from '@/shared/ui/huge-icons';
import { TFiltroPeriodo } from '@/types/filters';
import { GraficoPizza } from './GraficoPizza';
import { SelectCategoria } from './SelectCategoria';
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
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 opacity-70">
                <PieChart02Icon className="h-5 w-5" />
                <span className="text-base font-medium">
                    Despesas por Categoria
                </span>
            </CardHeader>
            <CardContent className="mb-8 flex h-full flex-wrap items-center justify-center gap-4">
                <GastosContext>
                    <GraficoPizza categorias={categorias} />
                    <div className="flex w-[200px] flex-col gap-4">
                        <SelectCategoria categorias={categorias} />
                        {categorias.map((categoria) => (
                            <div
                                className="flex items-center gap-2"
                                key={categoria.sigla}
                            >
                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{
                                        backgroundColor: categoria.cor,
                                    }}
                                />
                                <span className="text-sm font-medium">
                                    {categoria.nome}
                                </span>
                            </div>
                        ))}
                    </div>
                </GastosContext>
            </CardContent>
        </Card>
    );
}
