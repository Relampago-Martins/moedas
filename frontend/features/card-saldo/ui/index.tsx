import { Card, CardContent } from '@/shared/ui/card';
import { MonthPickerInput } from './MonthPickerInput';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {
    className?: string;
};

export function CardSaldo({ className }: CardSaldoProps) {
    return (
        <Card className={className}>
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-6">
                <MonthPickerInput />
                <Saldo valor={20000} />
            </CardContent>
        </Card>
    );
}
