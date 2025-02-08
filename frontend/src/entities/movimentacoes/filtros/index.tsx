'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMesSelecionado, getMonthRange } from './utils';

export function Filtros() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [dataSelecionada, setDataSelecionada] = useState<Date>(
        getMesSelecionado(searchParams.get('periodo_after')),
    );

    useEffect(() => {
        const { start, end } = getMonthRange(
            dataSelecionada.getMonth(),
            dataSelecionada.getFullYear(),
        );

        const params = new URLSearchParams(searchParams.toString());
        params.set('periodo_after', start);
        params.set('periodo_before', end);

        router.replace(`${pathname}?${params.toString()}`);
    }, [dataSelecionada]);

    return (
        <div className="mb-4 flex  h-10 w-full max-w-[40rem] items-center justify-between rounded-md border-[1px] border-border bg-card">
            <button
                onClick={() => {
                    setDataSelecionada(
                        new Date(
                            dataSelecionada.getFullYear(),
                            dataSelecionada.getMonth() - 1,
                            1,
                        ),
                    );
                }}
            >
                <i className="ph ph-caret-left ml-2"></i>
            </button>
            <span>
                {dataSelecionada.toLocaleString('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                })}
            </span>
            <button
                onClick={() => {
                    setDataSelecionada(
                        new Date(
                            dataSelecionada.getFullYear(),
                            dataSelecionada.getMonth() + 1,
                            1,
                        ),
                    );
                }}
            >
                <i className="ph ph-caret-right mr-2"></i>
            </button>
        </div>
    );
}
