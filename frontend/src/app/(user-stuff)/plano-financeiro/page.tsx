import { AnaliseCard } from '@/entities/orcamento/ui/analise-card';
import { CardOrcamento } from '@/entities/orcamento/ui/card-orcamento';
import { HeaderOrcamento } from '@/entities/orcamento/ui/header-orcamento';
import { getCategoria } from '@/shared/api/endpoints/categoria-cli';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';

export default async function Page() {
    const categoriaT = await getCategoria('A');
    const categoriaL = await getCategoria('L');

    return (
        <>
            <Suspense fallback={<p>Carregando...</p>}>
                <AnaliseCard />
                <HeaderOrcamento totalGasto={227} totalLimite={300} />
                <div className="flex flex-wrap items-start gap-6">
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
                <Button className="h-7 py-0">
                    <Plus className="h-5 w-5" />
                </Button>
            </Suspense>
        </>
    );
}
