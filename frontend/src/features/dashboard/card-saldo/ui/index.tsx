import { getCarteira } from '@/shared/api/endpoints';
import { getContasBancarias } from '@/shared/api/endpoints/conta-bancaria-cli';
import { Card, CardContent } from '@/shared/ui/card';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { TFiltroPeriodo } from '@/types/filters';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { ListaContaBancariRow } from './lista-conta-bancaria-row';
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
                        <ListaContaBancariRow
                            contasBancarias={contasBancarias}
                        />
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <Saldo valor={saldo} diffPercentual={diff_percentual} />
                <ListaContaBancariaCol contasBancarias={contasBancarias} />
            </DialogContent>
        </Dialog>
    );
}
