import { deleteDespesa, getDespesa } from '@/shared/api/endpoints/despesa-cli';
import { Button } from '@/shared/ui/button';
import { Despesa } from '@/types/models/despesa';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';

type DespesaDetailContext = {
    id: number;
};

export function DespesaDetail({ id }: DespesaDetailContext) {
    const router = useRouter();
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [despesa, setDespesa] = useState<Despesa | null>(null);
    useEffect(() => {
        getDespesa(id).then((despesa) => {
            setDespesa(despesa);
        });
    }, [id]);

    if (!despesa) return null;
    return (
        <div className="flex flex-col">
            <h1>{despesa.descricao}</h1>
            <p>{despesa.valor}</p>
            <div className="flex items-center">
                <Button
                    variant={'destructive'}
                    onClick={() => {
                        deleteDespesa(id).then(() => {
                            setMovimentacaoSelecionada(undefined);
                            router.refresh();
                        });
                    }}
                >
                    Excluir
                </Button>
            </div>
        </div>
    );
}
