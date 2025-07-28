'use client';
import { MoneyTile } from '../../../../shared/ui/custom/money-tile';
import { DiferencaSaldoBadge } from './diferenca-saldo-badge';
import './ui.scss';

type SaldoProps = {
    valor: number;
    diffPercentual: number;
};

export function Saldo(props: SaldoProps) {
    return (
        <div className="flex flex-col">
            <div className="flex w-full items-end justify-between gap-2">
                <MoneyTile
                    title="Saldo Total"
                    className="shrink-0 text-start text-primary"
                    size="xl"
                    value={props.valor}
                    trailing={
                        props.diffPercentual ? (
                            <DiferencaSaldoBadge
                                diffPercentual={props.diffPercentual}
                            />
                        ) : null
                    }
                />
            </div>
        </div>
    );
}
