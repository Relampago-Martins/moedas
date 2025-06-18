'use client';
import {
    criarOrcamento,
    deletarOrcamento,
    getOrcamento,
} from '@/shared/api/endpoints/orcamento';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { Progress } from '@/shared/ui/progress';
import { useState } from 'react';

type ModalLimiteGastosProps = {
    children?: React.ReactNode;
    className?: string;
};

export function ModalLimiteGastos({
    children,
    className,
}: ModalLimiteGastosProps) {
    const [novoLimite, setNovoLimite] = useState(0);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSalvar = () => {
        getOrcamento().then((orcamento) => {
            if (orcamento) {
                deletarOrcamento(orcamento.id!).then(() => {
                    criarOrcamento({
                        limite_gastos: novoLimite / 100,
                        salario: 0, // Assuming salario is not needed for this operation
                    }).then(() => setOpen(false));
                });
            } else {
                setError('Orçamento não encontrado');
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={className}>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar limite de gastos</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            setNovoLimite((prev) => Math.max(prev - 1, 0))
                        }
                    >
                        <i className="ph ph-minus text-lg" />
                    </Button>
                    <div className="relative flex w-full items-center">
                        <Progress
                            value={0}
                            className="my-2 w-full bg-muted opacity-40"
                        />

                        <div className="absolute inset-0 flex w-full">
                            <div
                                className="h-full w-[1px] border-r-2 border-dashed border-foreground"
                                style={{
                                    width: `${novoLimite}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            setNovoLimite((prev) => Math.min(prev + 1, 100))
                        }
                    >
                        <i className="ph ph-plus text-lg" />
                    </Button>
                </div>
                <span className="font-medium text-muted">
                    Limite de gastos: {novoLimite.toFixed(0)}%
                </span>
                {error && (
                    <div className="mt-2 text-red-500">
                        <i className="ph ph-warning" /> {error}
                    </div>
                )}
                <DialogFooter>
                    <Button
                        variant="outline"
                        className="shrink-0"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button className="w-full" onClick={onSalvar}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
