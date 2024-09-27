import { deleteReceita, getReceita } from '@/shared/api/endpoints/receita-cli';
import { numberToCurrency } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { TradeUpIcon } from '@/shared/ui/huge-icons/receita';
import { Receita } from '@/types/models/receita';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';

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

    if (!receita) return null;
    return (
        <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2">
                <div className="w-fit rounded-full bg-green-200/50 p-1">
                    <TradeUpIcon className="h-6 w-6 text-green-700" />
                </div>
                <h2 className="text-xl">{receita.descricao}</h2>
            </div>
            <h2 className="mb-6 text-xl">{numberToCurrency(receita.valor)}</h2>

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
        </div>
    );
}
