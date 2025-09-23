'use client';
import { MoneyTile } from '../../../../shared/ui/custom/money-tile';
import { DiferencaSaldoBadge } from './diferenca-saldo-badge';
import './ui.scss';

type SaldoProps = {
    valor: number;
    diffPercentual?: number;
};

export function Saldo(props: SaldoProps) {
    return (
        <div className="flex w-full items-end justify-between gap-2">
            <MoneyTile
                title="Saldo total"
                className="w-full shrink-0 text-start text-primary"
                size="xl"
                value={props.valor}
                trailing={
                    props.diffPercentual !== undefined ? (
                        <DiferencaSaldoBadge
                            diffPercentual={props.diffPercentual}
                        />
                    ) : null
                }
            />
        </div>
    );
}
