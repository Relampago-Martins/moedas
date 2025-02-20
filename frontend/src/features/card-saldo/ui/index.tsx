import { getCarteira } from '@/shared/api/endpoints';
import { Card, CardContent, CardTitle } from '@/shared/ui/card';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {
    className?: string;
};

export async function CardSaldo({ className }: CardSaldoProps) {
    const { saldo } = await getCarteira();

    return (
        <Card className={className}>
            <CardTitle>Saldo</CardTitle>
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-6">
                <Saldo valor={saldo} />
            </CardContent>
        </Card>
    );
}
