import { CardTransacao } from '@/features/card-balanco/ui/CardTransacao';
import { numberToCurrency } from '@/shared/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { AlignVerticalCenterIcon } from '@/shared/ui/huge-icons';
import { Separator } from '@/shared/ui/separator';
import { balancoMes } from '../lib/data';
import { FooterContent } from './FooterContent';
import { GraficoBalanco } from './GraficoBalanco';

type CardBalancoProps = {
    className?: string;
};
export function CardBalanco({ className }: CardBalancoProps) {
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
                <GraficoBalanco />
                <div className="flex flex-col gap-1">
                    <CardTransacao className="gap-3 text-green-600">
                        <div className="flex flex-row items-center gap-2">
                            Receitas
                        </div>
                        <div>{numberToCurrency(balancoMes.Receitas)}</div>
                    </CardTransacao>
                    <CardTransacao className="gap-3 text-rose-600">
                        <div className="flex flex-row items-center gap-2">
                            Gastos
                        </div>
                        <div>{numberToCurrency(balancoMes.Gastos)}</div>
                    </CardTransacao>
                    <Separator className="my-1" />
                    <CardTransacao className="gap-3 font-semibold opacity-70">
                        <div>Balanço</div>
                        <div>
                            {numberToCurrency(
                                balancoMes.Receitas - balancoMes.Gastos,
                            )}
                        </div>
                    </CardTransacao>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-center pt-8">
                <FooterContent />
            </CardFooter>
        </Card>
    );
}
