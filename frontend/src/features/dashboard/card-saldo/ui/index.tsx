import { Stepper, StepperContent } from '@/entities/stepper/ui/stepper';
import { getCarteira } from '@/shared/api/endpoints';
import { getContasBancarias } from '@/shared/api/endpoints/conta-bancaria-cli';
import { Card, CardContent } from '@/shared/ui/card';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { TFiltroPeriodo } from '@/types/filters';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DiferencaSaldoBadge } from './diferenca-saldo-badge';
import { ListaContaBancariaRow } from './lista-conta-bancaria-row';
import { StepDetalheContaBancaria } from './modal/detalhe-conta-bancaria';
import { StepExcluirContaBancaria } from './modal/excluir-conta-bancaria';
import { ListaBancos } from './modal/lista-bancos';
import { ListaContaBancariaCol } from './modal/lista-contabancaria-col';
import { StepFormContaBancaria } from './modal/step-form-conta-bancaria';
import { Saldo } from './Saldo';
import './ui.scss';

type CardSaldoProps = {
    className?: string;
    params: TFiltroPeriodo;
};

export async function CardSaldo({ className, params }: CardSaldoProps) {
    const { saldo, diff_percentual } = await getCarteira(params);
    const { data: contasBancarias } = await getContasBancarias();

    return (
        <Dialog>
            <DialogTrigger className={`${className} flex flex-col`}>
                <Card>
                    <CardContent className="flex h-full flex-col justify-center gap-3">
                        <Saldo valor={saldo} diffPercentual={diff_percentual} />
                        <ListaContaBancariaRow
                            contasBancarias={contasBancarias}
                        />
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="overflow-hidden">
                <Stepper
                    defaultValue={{
                        name: 'saldo-e-contas',
                        level: 0,
                    }}
                >
                    <StepperContent
                        value="saldo-e-contas"
                        level={0}
                        className="flex flex-col gap-5"
                    >
                        <Saldo valor={saldo} />
                        <div className="flex items-center gap-2">
                            <DiferencaSaldoBadge
                                diffPercentual={diff_percentual}
                            />
                            <span className="text-muted">este mês</span>
                        </div>
                        <ListaContaBancariaCol
                            contasBancarias={contasBancarias}
                        />
                    </StepperContent>
                    <StepFormContaBancaria
                        step={{ name: 'cadastro-conta-bancaria', level: 1 }}
                    />
                    <StepDetalheContaBancaria
                        value="detalhe-conta-bancaria"
                        level={1}
                    />
                    <StepExcluirContaBancaria
                        value="excluir-conta-bancaria"
                        level={2}
                    />
                    <StepFormContaBancaria
                        step={{ name: 'edit-conta-bancaria', level: 2 }}
                    />
                    <StepperContent value="lista-bancos" level={3}>
                        <ListaBancos />
                    </StepperContent>
                </Stepper>
            </DialogContent>
        </Dialog>
    );
}
