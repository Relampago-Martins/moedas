import { StepObject, useStepper } from '@/features/modal-novo/ui/stepper';
import { Button } from '@/shared/ui/button';
import { useQueryClient } from '@tanstack/react-query';

type ExcluirMovimentacaoProps = {
    id: number;
    tipoMovimentacao: string;
    ondDelete: () => void;
    stepBack: StepObject<string>;
};

export function ExcluirMovimentacao({
    id,
    tipoMovimentacao,
    ondDelete,
    stepBack,
}: ExcluirMovimentacaoProps) {
    const queryClient = useQueryClient();
    const { goToStep } = useStepper();

    return (
        <div>
            <h1 className="text-xl font-semibold">
                Deseja excluir essa {tipoMovimentacao}?
            </h1>
            <h3 className="mb-4 text-base text-muted">
                Essa ação não poderá ser desfeita.
            </h3>
            <div className="flex justify-end gap-2">
                <Button
                    onClick={() => {
                        goToStep(stepBack);
                    }}
                    variant={'outline'}
                >
                    Cancelar
                </Button>
                <Button
                    variant={'destructive'}
                    onClick={() => {
                        ondDelete();
                        queryClient.invalidateQueries({
                            queryKey: ['movimentacoes'],
                        });
                    }}
                    className="btn btn-danger"
                >
                    Excluir
                </Button>
            </div>
        </div>
    );
}
