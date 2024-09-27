import { numberToCurrency } from '@/shared/lib/utils';
import { Wallet03Icon } from '@/shared/ui/huge-icons';
import { ChevronRight } from 'lucide-react';
import './ui.scss';

type SaldoProps = {
    valor: number;
};

export function Saldo(props: SaldoProps) {
    return (
        <div className="saldo">
            <div className="text-2xl font-semibold text-primary">
                {numberToCurrency(props.valor)}
            </div>
            <div className="align-center flex gap-1 text-sm text-muted">
                <Wallet03Icon className="h-3 self-center" />
                Saldo atual
                <ChevronRight className="h-3 self-center" />
            </div>
        </div>
    );
}
