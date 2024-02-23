import { Card, CardContent } from '@/shared/ui/card';
import { MonthPickerInput } from './MonthPickerInput';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {};

export function CardSaldo(props: CardSaldoProps) {
    return (
        <Card className="max-w-full flex-grow">
            <CardContent className="flex h-full flex-col justify-between gap-4 pt-6">
                <MonthPickerInput />
                <Saldo valor={20000} />
            </CardContent>
        </Card>
    );
}
