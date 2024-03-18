import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { BsChevronRight, BsReceipt } from 'react-icons/bs';
import { GraficoPizza } from './GraficoPizza';

type CardGastosProps = {
    className?: string;
};

export function CardGastos({ className }: CardGastosProps) {
    return (
        <Card title="Gastos" className={className}>
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 opacity-70">
                <BsReceipt className="text-lg" />
                <span className="text-base font-semibold">Gastos do mês</span>
                <BsChevronRight className="mt-0 self-center text-sm" />
            </CardHeader>
            <CardContent>
                <GraficoPizza />
            </CardContent>
        </Card>
    );
}
