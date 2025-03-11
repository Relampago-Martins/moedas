import { CardTransacao } from '@/features/card-balanco/ui/CardTransacao';
import { getCarteira } from '@/shared/api/endpoints';
import { numberToCurrency } from '@/shared/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { AlignVerticalCenterIcon } from '@/shared/ui/huge-icons';
import { Separator } from '@/shared/ui/separator';
import { TFiltroPeriodo } from '@/types/filters';
import { FooterContent } from './FooterContent';
import { GraficoBalanco } from './GraficoBalanco';

type CardBalancoProps = {
    className?: string;
    params: TFiltroPeriodo;
};
export async function CardBalanco({ className, params }: CardBalancoProps) {
    const { saldo, total_despesas, total_receitas } = await getCarteira(params);

    return (
        <Card title="Balanço Mensal" className={className}>
            <CardHeader
                className="flex flex-row items-center gap-2 space-y-0
                font-medium opacity-70 hover:cursor-pointer"
            >
                <AlignVerticalCenterIcon className="h-5 w-5" />
                <span className="text-base">Balanço Mensal</span>
            </CardHeader>
            <CardContent className="flex flex-row justify-center gap-4 pb-0">
                <GraficoBalanco
                    carteira={{ saldo, total_despesas, total_receitas }}
                />
                <div className="flex flex-col gap-1">
                    <CardTransacao className="gap-3 text-success-foreground">
                        <div className="flex flex-row items-center gap-2">
                            Receitas
                        </div>
                        <div>{numberToCurrency(total_receitas)}</div>
                    </CardTransacao>
                    <CardTransacao className="gap-3 text-destructive-foreground">
                        <div className="flex flex-row items-center gap-2">
                            Despesas
                        </div>
                        <div>{numberToCurrency(total_despesas)}</div>
                    </CardTransacao>
                    <Separator className="my-1" />
                    <CardTransacao className="gap-3 font-semibold opacity-70">
                        <div>Balanço</div>
                        <div>
                            {numberToCurrency(total_receitas - total_despesas)}
                        </div>
                    </CardTransacao>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-center pt-8">
                <FooterContent
                    carteira={{ saldo, total_despesas, total_receitas }}
                />
            </CardFooter>
        </Card>
    );
}
