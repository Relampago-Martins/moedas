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
        <div className="px-6 py-6 md:px-8">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Plano financeiro
            </h1>
            <p className="text-muted">
                Aqui você pode visualizar e editar seu plano financeiro.
            </p>
            <Suspense fallback={<p>Carregando...</p>}>
                <div className="flex max-w-[1000px] flex-col gap-3 pt-4">
                    <div className="flex items-center gap-8">
                        <h1 className="border-b-2 border-primary text-lg font-medium text-primary">
                            Orçamento
                        </h1>
                        <h1 className="text-lg text-muted">Metas</h1>
                        <h1 className="text-lg text-muted">Fundos</h1>
                    </div>
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
                </div>
            </Suspense>
        </div>
    );
}
