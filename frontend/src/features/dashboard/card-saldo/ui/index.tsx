import { getCarteira } from '@/shared/api/endpoints';
import { Card } from '@/shared/ui/card';
import { TFiltroPeriodo } from '@/types/filters';
import { FiltroPeriodo } from './filtro-periodo';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {
    className?: string;
    params: TFiltroPeriodo;
};

export async function CardSaldo({ className, params }: CardSaldoProps) {
    const { saldo } = await getCarteira(params);

    return (
        <Card className={className}>
            <div className="border-b shadow-sm">
                <FiltroPeriodo />
            </div>
            <div className="flex h-full flex-col justify-between gap-4 px-6 py-3">
                <Saldo valor={saldo} />
            </div>
        </Card>
    );
}
