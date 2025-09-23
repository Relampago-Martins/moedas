'use client';
import { CardBanco, CardBancoSkeleton } from '@/entities/card-banco';
import { useStepper } from '@/entities/stepper/ui/stepper';
import { getBancos } from '@/shared/api/endpoints/conta-bancaria-cli';
import { useDebounce } from '@/shared/lib/use-debounce';
import { Input } from '@/shared/ui/input';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PreviousBtn } from '../shared/previous-btn';
import styles from './styles.module.scss';

export function ListaBancos() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { events, previous } = useStepper();
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500); //garante que a animação do stepper termine antes de focar o input
    }, []);

    const {
        data = [],
        isLoading,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['bancos', debouncedSearch],
        queryFn: async () => {
            const response = await getBancos(debouncedSearch);
            return response.data || [];
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const bancos = useMemo(() => data, [data]);

    return (
        <div className="flex h-[500px] w-full flex-col">
            <PreviousBtn />
            <span className="my-2 text-lg font-medium">Selecione um banco</span>
            <Input
                ref={inputRef}
                placeholder="Pesquisar por nome"
                className="w-full"
                type="search"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <div
                className={`flex flex-col gap-2 ${styles.list} -mx-4 mt-2 px-4 py-2`}
                style={{ opacity: isPlaceholderData ? 0.5 : 1 }}
            >
                {isLoading ? (
                    // Renderiza skeletons quando está carregando
                    Array.from({ length: 5 }).map((_, index) => (
                        <CardBancoSkeleton key={index} />
                    ))
                ) : bancos.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="mx-4 text-center text-sm text-muted">
                            Nenhum banco encontrado.
                        </div>
                    </div>
                ) : (
                    bancos.map((banco) => (
                        <CardBanco
                            key={banco.ispb}
                            banco={banco}
                            onClick={(banco) => {
                                events.submit('onSelectBanco', banco);
                                previous();
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
