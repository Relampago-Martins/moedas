import { ModalMovimentacao } from '@/entities/modal-movimentacao/ui';
import { MovimentacaoProvider } from '@/entities/modal-movimentacao/ui/movimentacao-provider';
import { ListaMovimentacoes } from '@/features/lista-movimentacoes/ui';
import { listaMovimentacoes } from '@/shared/api/endpoints/movimentacao-cli';
import { Suspense } from 'react';

export default async function Page() {
    const movimentacoes = await listaMovimentacoes();
    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Movimentações
            </h1>
            <p className="mb-6 text-muted">
                Esta é a página de movimentações. Aqui você pode visualizar os
                seus gastos, ganhos, aplicações e outras movimentações.
            </p>
            <MovimentacaoProvider>
                <Suspense fallback={<p>Carregando...</p>}>
                    <ListaMovimentacoes movimentacoes={movimentacoes} />
                </Suspense>
                <ModalMovimentacao />
            </MovimentacaoProvider>
        </div>
    );
}
