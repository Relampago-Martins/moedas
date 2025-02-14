import { Button } from '@/shared/ui/button';
import { useQueryClient } from '@tanstack/react-query';

type ExcluirMovimentacaoProps = {
    id: number;
    tipoMovimentacao: string;
    ondDelete: () => void;
    onCancelar: () => void;
};

export function ExcluirMovimentacao({
    id,
    tipoMovimentacao,
    ondDelete,
    onCancelar,
}: ExcluirMovimentacaoProps) {
    const queryClient = useQueryClient();

    return (
        <div>
            <h1 className="text-xl font-semibold">
                Deseja excluir essa {tipoMovimentacao}?
            </h1>
            <h3 className="mb-4 text-base text-muted">
                Essa ação não poderá ser desfeita.
            </h3>
            <div className="flex justify-end gap-2">
                <Button onClick={onCancelar} variant={'outline'}>
                    Cancelar
                </Button>
                <Button
                    variant={'destructive'}
                    onClick={() => {
                        queryClient.invalidateQueries({
                            queryKey: ['movimentacoes'],
                        });
                        ondDelete();
                    }}
                    className="btn btn-danger"
                >
                    Excluir
                </Button>
            </div>
        </div>
    );
}
