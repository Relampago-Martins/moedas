import { numberToCurrency } from '@/shared/lib/utils';
import { BsChevronRight, BsWallet2 } from 'react-icons/bs';
import './ui.scss';

type SaldoProps = {
    valor: number;
};

export function Saldo(props: SaldoProps) {
    return (
        <div className="saldo">
            <div className="text-2xl font-semibold text-secondary-foreground">
                {numberToCurrency(props.valor)}
            </div>
            <div className="align-center flex gap-1 text-sm opacity-65">
                <BsWallet2 className="h-3 self-center" />
                Saldo atual
                <BsChevronRight className="h-3 self-center" />
            </div>
        </div>
    );
}
