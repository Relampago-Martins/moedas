import { getCarteira } from '@/shared/api/endpoints';
import { getContasBancarias } from '@/shared/api/endpoints/conta-bancaria-cli';
import { Card, CardContent } from '@/shared/ui/card';
import { TFiltroPeriodo } from '@/types/filters';
import { ListaContasBancarias } from './lista-conta-bancaria';
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
        <>
            <Card className={`${className} flex flex-col`}>
                <CardContent className="flex h-full flex-col justify-center gap-3">
                    <Saldo valor={saldo} diffPercentual={diff_percentual} />
                    <ListaContasBancarias contasBancarias={contasBancarias} />
                </CardContent>
            </Card>
        </>
    );
}
