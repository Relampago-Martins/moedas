'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useState } from 'react';
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
        <div className="flex flex-col gap-1">
            <div className="align-center flex gap-1 text-sm text-muted">
                <i className="ph ph-wallet flex text-lg"></i>
                Saldo
            </div>
            <div className="flex items-center text-primary">
                <span className="mr-1 mt-0 text-base">R$</span>
                <div className="shrink-0 text-2xl font-semibold">
                    {show ? valorShow : valorShow.replace(/\d/g, '*')}
                </div>
                <button
                    className="ml-3"
                    onClick={() => setShow(!show)}
                    aria-label="Mostrar saldo"
                >
                    <i
                        className={`ph ${show ? 'ph-eye-slash' : 'ph-eye'} flex text-lg text-muted`}
                    ></i>
                </button>
                {props.diffPercentual ? (
                    <div
                        className="flex w-full items-center justify-end gap-1 text-end"
                        style={{
                            color: evoluiuPatrimonio
                                ? 'var(--success-foreground)'
                                : 'var(--destructive-foreground)',
                        }}
                    >
                        {evoluiuPatrimonio ? (
                            <i className="ph ph-arrow-fat-line-up flex text-lg"></i>
                        ) : (
                            <i className="ph ph-arrow-fat-line-down flex text-lg"></i>
                        )}
                        <span className="text-sm">
                            {props.diffPercentual.toFixed(0).replace('.', ',')}%
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
