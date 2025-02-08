import { ModalMovimentacao } from '@/entities/modal-movimentacao/ui';
import { MovimentacaoProvider } from '@/entities/modal-movimentacao/ui/movimentacao-provider';
import { CardDespesas } from '@/entities/movimentacoes/card-despesas/ui';
import { CardReceitas } from '@/entities/movimentacoes/card-receitas/ui';
import { Filtros } from '@/entities/movimentacoes/filtros';
import { ListaMovimentacoes } from '@/features/lista-movimentacoes/ui';
import { LeftToRightListDashIcon } from '@/shared/ui/huge-icons';
import './ui.scss';

export default async function Page() {
    return (
        <div className="px-6 py-6 md:px-8">
            <h1 className="mb-6 flex items-center gap-2 text-xl font-semibold leading-10 text-primary">
                <LeftToRightListDashIcon className="h-4 w-4" />
                Movimentações
            </h1>
            {/* <p className="mb-6 text-muted">
                Esta é a página de movimentações. Aqui você pode visualizar os
                seus gastos, ganhos, aplicações e outras movimentações.
            </p> */}
            <Filtros />
            <MovimentacaoProvider>
                <div className="scroll-horizontal mb-4 flex max-w-[40rem] gap-6">
                    <CardDespesas />
                    <CardReceitas />
                </div>
                <ListaMovimentacoes />
                <ModalMovimentacao />
            </MovimentacaoProvider>
        </div>
    );
}
