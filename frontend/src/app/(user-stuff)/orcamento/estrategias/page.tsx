'use client';

import { getEstrategia } from '@/shared/api/endpoints/estrategia';
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
        </div>
    );
}
