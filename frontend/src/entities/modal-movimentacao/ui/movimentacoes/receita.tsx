import { deleteReceita, getReceita } from '@/shared/api/endpoints/receita-cli';
import { numberToCurrency, toLocalDate } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeUpIcon } from '@/shared/ui/huge-icons/receita';
import { Receita } from '@/types/models/receita';
import { motion } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { ReceitaSkeleton } from '../skeletons/receita';

type ReceitaDetailContext = {
    id: number;
};

export function ReceitaDetail({ id }: ReceitaDetailContext) {
    const router = useRouter();
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [receita, setReceita] = useState<Receita | null>(null);
    useEffect(() => {
        getReceita(id).then((receita) => {
            setReceita(receita);
        });
    }, [id]);

    return !!receita ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
        >
            <div className="mb-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-fit rounded-full bg-success p-1">
                        <TradeUpIcon className="h-6 w-6 text-success-foreground" />
                    </div>
                    <h2 className="text-xl">{receita.descricao}</h2>
                </div>
                <h2 className="text-xl">{numberToCurrency(receita.valor)}</h2>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div
                        className="h-6 w-6 rounded-full"
                        style={{
                            backgroundColor: receita.categoria.cor,
                        }}
                    ></div>
                    <span className="text-sm text-muted">
                        {receita.categoria.nome}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6" />
                <div className="flex flex-col">
                    <div className="text-xs text-muted">Recebido em</div>
                    <span className="text-base">
                        {toLocalDate(new Date(receita.data))}
                    </span>
                </div>
            </div>
            <div className="mt-2 flex items-center justify-end gap-2">
                <Button
                    variant={'destructive'}
                    onClick={() => {
                        deleteReceita(id).then(() => {
                            setMovimentacaoSelecionada(undefined);
                            router.refresh();
                        });
                    }}
                >
                    Excluir
                </Button>
                <Button variant={'outline'}>Editar</Button>
            </div>
        </motion.div>
    ) : (
        <ReceitaSkeleton />
    );
}
