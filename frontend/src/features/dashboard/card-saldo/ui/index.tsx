import { Stepper, StepperContent } from '@/entities/stepper/ui/stepper';
import { getCarteira } from '@/shared/api/endpoints';
import { getContasBancarias } from '@/shared/api/endpoints/conta-bancaria-cli';
import { Card, CardContent } from '@/shared/ui/card';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { TFiltroPeriodo } from '@/types/filters';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { CadastroContaBancaria } from './cadastro-conta-bancaria';
import { DetalheContaBancaria } from './detalhe-conta-bancaria';
import { ListaContaBancariaRow } from './lista-conta-bancaria-row';
import { ListaContaBancariaCol } from './lista-contabancaria-col';
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
                        <Saldo valor={saldo} diffPercentual={diff_percentual} />
                        <ListaContaBancariaCol
                            contasBancarias={contasBancarias}
                        />
                    </StepperContent>
                    <StepperContent value="cadastro-conta-bancaria" level={1}>
                        <CadastroContaBancaria />
                    </StepperContent>
                    <StepperContent value="detalhe-conta-bancaria" level={2}>
                        <DetalheContaBancaria />
                    </StepperContent>
                </Stepper>
            </DialogContent>
        </Dialog>
    );
}
