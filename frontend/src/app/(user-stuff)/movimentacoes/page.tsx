import { CardDespesas } from '@/entities/card-despesas/ui';
import { CardReceitas } from '@/entities/card-receitas/ui';
import { ModalMovimentacao } from '@/entities/modal-movimentacao/ui';
import { MovimentacaoProvider } from '@/entities/modal-movimentacao/ui/movimentacao-provider';
import { ListaMovimentacoes } from '@/features/lista-movimentacoes/ui';
import { listaMovimentacoes } from '@/shared/api/endpoints/movimentacao-cli';
import { Suspense } from 'react';
import './ui.scss';

export default async function Page() {
    const movimentacoes = await listaMovimentacoes();
    return (
        <div className="px-6 py-6 md:px-8">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Movimentações
            </h1>
            <p className="mb-6 text-muted">
                Esta é a página de movimentações. Aqui você pode visualizar os
                seus gastos, ganhos, aplicações e outras movimentações.
            </p>
            <div className="scroll-horizontal mb-4 flex gap-6">
                <CardDespesas
                    despesas={movimentacoes.filter(
                        (movimentacao) => movimentacao.tipo === 'D',
                    )}
                />
                <CardReceitas
                    receitas={movimentacoes.filter(
                        (movimentacao) => movimentacao.tipo === 'R',
                    )}
                />
            </div>
            <MovimentacaoProvider>
                <Suspense fallback={<p>Carregando...</p>}>
                    <ListaMovimentacoes movimentacoes={movimentacoes} />
                </Suspense>
                <ModalMovimentacao />
            </MovimentacaoProvider>
        </div>
    );
}
