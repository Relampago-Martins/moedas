import { getCarteira } from '@/shared/api/endpoints';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { TFiltroPeriodo } from '@/types/filters';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {
    className?: string;
    params: TFiltroPeriodo;
};

export async function CardSaldo({ className, params }: CardSaldoProps) {
    const { saldo, diff_percentual } = await getCarteira(params);

    return (
        <Card className={`${className} flex flex-col`}>
            <CardHeader className="flex h-8 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted">
                <i className="ph ph-wallet text-lg text-muted" />
                <span className="text-sm">Saldo</span>
            </CardHeader>
            <CardContent className="flex h-full flex-col justify-center">
                <Saldo valor={saldo} diffPercentual={diff_percentual} />
            </CardContent>
        </Card>
    );
}
