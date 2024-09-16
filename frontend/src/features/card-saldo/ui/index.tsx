import { Card, CardContent } from '@/shared/ui/card';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {
    className?: string;
    saldo: number;
};

export function CardSaldo({ className, saldo }: CardSaldoProps) {
    return (
        <Card className={className}>
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-6">
                <Saldo valor={saldo} />
            </CardContent>
        </Card>
    );
}
