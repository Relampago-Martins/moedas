import { CardOrcamento } from '@/entities/card-orcamento/ui';
import { getCategoria } from '@/shared/api/endpoints/categoria-cli';
import { Suspense } from 'react';

export default async function Page() {
    const categoriaT = await getCategoria('A');
    const categoriaL = await getCategoria('L');

    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Plano financeiro
            </h1>
            <p className="text-muted">
                Aqui você pode visualizar e editar seu plano financeiro.
            </p>
            <div className="flex flex-col gap-3 pt-10">
                <Suspense fallback={<p>Carregando...</p>}>
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
                </Suspense>
            </div>
        </div>
    );
}
