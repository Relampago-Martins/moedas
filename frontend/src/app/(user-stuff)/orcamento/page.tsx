import { CardOrcamento } from '@/entities/orcamento/ui/card-orcamento';
import { getCategoria } from '@/shared/api/endpoints/categoria-cli';
import { Card } from '@/shared/ui/card';
import { Suspense } from 'react';

export default async function Page() {
    const categoriaT = await getCategoria('A');
    const categoriaL = await getCategoria('L');

    return (
        <Suspense fallback={<p>Carregando...</p>}>
            {/* <AnaliseCard /> */}
            {/* <HeaderOrcamento totalGasto={227} totalLimite={300} /> */}
            <div className="mt-4 flex h-full flex-wrap justify-between gap-4 sm:flex-nowrap">
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
                <Card className="w-full sm:w-[400px] "></Card>
            </div>
            {/* <Button className="h-7 py-0">
                <Plus className="h-5 w-5" />
            </Button> */}
        </Suspense>
    );
}
