import { CardOrcamento } from '@/entities/orcamento/ui/card-orcamento';
import { getCategoria } from '@/shared/api/endpoints/categoria-cli';
import { Suspense } from 'react';

export default async function Page() {
    const categoriaT = await getCategoria('A');
    const categoriaL = await getCategoria('L');

    return (
        <Suspense fallback={<p>Carregando...</p>}>
            {/* <AnaliseCard /> */}
            {/* <HeaderOrcamento totalGasto={227} totalLimite={300} /> */}
            <div className="flex w-full flex-wrap items-start gap-6">
                <CardOrcamento
                    categoria={categoriaT}
                    nome="Transporte"
                    valorGasto={167}
                    valorLimite={200}
                />
                <CardOrcamento
                    categoria={categoriaL}
                    nome="Lazer"
                    valorGasto={60}
                    valorLimite={100}
                />
            </div>
        </Suspense>
    );
}
