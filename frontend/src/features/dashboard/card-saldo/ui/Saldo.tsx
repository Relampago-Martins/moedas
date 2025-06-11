'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useState } from 'react';
import { MoneyTile } from '../../../../shared/ui/custom/money-tile';
import './ui.scss';

type SaldoProps = {
    valor: number;
    diffPercentual: number;
};

export function Saldo(props: SaldoProps) {
    const [show, setShow] = useState(true);

    const valorShow = numberToCurrency(props.valor).replace('R$', '').trim();
    const evoluiuPatrimonio = props.diffPercentual > 0;
    return (
        <div className="flex items-center justify-between">
            <MoneyTile
                className="shrink-0 text-start text-primary"
                size="xl"
                value={props.valor}
            />

            {/* <button
                    className="ml-3"
                    onClick={() => setShow(!show)}
                    aria-label="Mostrar saldo"
                >
                    <i
                        className={`ph ${show ? 'ph-eye-slash' : 'ph-eye'} flex text-lg text-muted`}
                    ></i>
                </button> */}
            {props.diffPercentual ? (
                <div
                    className="flex w-fit items-center gap-1 rounded-md p-1"
                    style={{
                        color: evoluiuPatrimonio
                            ? 'var(--success-foreground)'
                            : 'var(--destructive-foreground)',
                        backgroundColor: evoluiuPatrimonio
                            ? 'var(--success)'
                            : 'var(--destructive)',
                    }}
                >
                    {evoluiuPatrimonio ? (
                        <i className="ph ph-arrow-up flex text-lg"></i>
                    ) : (
                        <i className="ph ph-arrow-down flex text-lg"></i>
                    )}
                    <span className="text-sm">
                        {props.diffPercentual
                            .toFixed(0)
                            .replace('.', ',')
                            .replace('-', '')}
                        %
                    </span>
                </div>
            ) : null}
        </div>
    );
}
