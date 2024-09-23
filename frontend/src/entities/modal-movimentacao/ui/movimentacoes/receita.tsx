import { deleteReceita, getReceita } from '@/shared/api/endpoints/receita-cli';
import { Button } from '@/shared/ui/button';
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
        <div>
            <h1>{receita.descricao}</h1>
            <p>{receita.valor}</p>
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
