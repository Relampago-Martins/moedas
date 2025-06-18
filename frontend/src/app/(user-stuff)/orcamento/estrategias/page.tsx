'use client';

import { CardEstrategia } from '@/features/plano-financeiro/card-estrategia';
import { getEstrategia } from '@/shared/api/endpoints/estrategia';
import { Skeleton } from '@/shared/ui/skeleton';
import { Estrategia } from '@/types/models/estrategia';
import { useEffect, useState } from 'react';

export default function EstrategiasPage() {
    const [estrategia, setEstrategia] = useState<Estrategia | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEstrategia() {
            try {
                setLoading(true);
                const data = await getEstrategia();
                setEstrategia(data);
            } catch (error) {
                console.error('Erro ao buscar estratégia:', error);
                setEstrategia(null);
            } finally {
                setLoading(false);
            }
        }
        fetchEstrategia();
    }, []);

    const handleEstrategiaUpdate = (novaEstrategia: Estrategia) => {
        setEstrategia(novaEstrategia);
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold leading-10 text-primary">
                Estratégias
            </h1>
            <p className="text-muted">
                Aqui você pode visualizar e editar sua estratégia financeira.
            </p>
            {loading ? (
                <CardEstrategiaSkeleton />
            ) : (
                <CardEstrategia
                    estrategia={estrategia}
                    onEstrategiaUpdate={handleEstrategiaUpdate}
                />
            )}
        </div>
    );
}

function CardEstrategiaSkeleton() {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2 p-6 pt-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-center justify-end p-6 pt-0">
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    );
}
