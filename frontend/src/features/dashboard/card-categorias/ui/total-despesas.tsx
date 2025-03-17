'use client';
import { numberToCurrency } from '@/shared/lib/utils';
import { useContext } from 'react';
import { GastosContext } from '../lib/context';

export function TotalDespesas({ total }: { total: number }) {
    const { categoriaSelecionada } = useContext(GastosContext);
    return (
        <div className="w-full rounded-md border bg-muted-foreground px-2 text-center">
            <span
                className="text-lg"
                style={{
                    color: categoriaSelecionada?.cor ?? 'var(--muted)',
                }}
            >
                {numberToCurrency(
                    categoriaSelecionada?.total_movimentacoes ?? total,
                )}
            </span>
        </div>
    );
}
