import { ModalMovimentacao } from '@/entities/modal-movimentacao/ui';
import { MovimentacaoProvider } from '@/entities/modal-movimentacao/ui/movimentacao-provider';
import { CardDespesas } from '@/entities/movimentacoes/card-despesas/ui';
import { CardReceitas } from '@/entities/movimentacoes/card-receitas/ui';
import { Filtros } from '@/entities/movimentacoes/filtros/ui';
import { ListaMovimentacoes } from '@/entities/movimentacoes/lista-movimentacoes/ui';
import { Card } from '@/shared/ui/card';
import './ui.scss';

export default function Page() {
    return (
        <div className="px-6 py-6 md:px-8 xl:px-36">
            <h1 className="mb-6 flex items-center gap-2 text-xl font-semibold leading-10 text-primary">
                <i className="ph ph-arrows-down-up flex text-2xl"></i>
                Movimentações
            </h1>
            {/* <p className="mb-6 text-muted">
                Esta é a página de movimentações. Aqui você pode visualizar os
                seus gastos, ganhos, aplicações e outras movimentações.
            </p> */}
            <Filtros />
            <div className="mt-4 flex flex-wrap gap-4 sm:flex-nowrap">
                <div className="flex w-full flex-col gap-4">
                    <MovimentacaoProvider>
                        <div className="scroll-horizontal flex max-w-full gap-6">
                            <CardDespesas />
                            <CardReceitas />
                        </div>
                        <ListaMovimentacoes />
                        <ModalMovimentacao />
                    </MovimentacaoProvider>
                </div>
                <Card className="w-full sm:w-[400px] "></Card>
            </div>
        </div>
    );
}
