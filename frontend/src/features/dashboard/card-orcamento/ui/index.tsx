import { getCarteira } from '@/shared/api/endpoints';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { TFiltroPeriodo } from '@/types/filters';
import Link from 'next/link';

type CardOrcamentoProps = {
    className?: string;
    params: TFiltroPeriodo;
};
export async function CardOrcamento({ className, params }: CardOrcamentoProps) {
    const { orcamento } = await getCarteira(params);
    const limteGasto = orcamento.limite_gastos * 100;
    const gastos = orcamento.percentual_gastos * 100;
    return (
        <Card className={`${className} flex flex-col`}>
            <CardHeader className="flex h-8 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted">
                <i className="ph ph-crosshair text-lg text-muted" />
                <span className="text-sm">Orçamento</span>
                <Link className="ml-auto" href="/plano-financeiro">
                    <i className="ph  ph-arrow-right flex text-lg text-muted" />
                </Link>
            </CardHeader>
            <CardContent className="flex h-full flex-col justify-center gap-3">
                <div className="rounded-md bg-background p-2 text-center text-sm text-foreground ">
                    {orcamento.mensagem}
                </div>
                <div className="relative flex items-center">
                    <Progress value={gastos} className="my-2" />

                    <div className="absolute inset-0 flex w-full">
                        <div
                            className="h-full w-[1px] border-r-2 border-dashed border-foreground"
                            style={{
                                width: `${limteGasto}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm bg-destructive-foreground"></span>
                        <span className="mr-auto text-sm text-muted">
                            Despesa
                        </span>
                        <div>
                            <span className="mr-0.5 text-lg font-semibold">
                                {gastos.toFixed(0)}
                            </span>
                            <span className="text-xs text-muted">%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-0 w-4 border-y border-dashed border-foreground"></span>
                        <span className="mr-auto text-sm text-muted">
                            Limite
                        </span>
                        <div>
                            <span className="mr-0.5 text-lg font-semibold">
                                {limteGasto.toFixed(0)}
                            </span>
                            <span className="text-xs text-muted">%</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
