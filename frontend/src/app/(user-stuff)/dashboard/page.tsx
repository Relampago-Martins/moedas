import { CardBalanco } from '@/features/card-balanco/ui';
import { CardGastos } from '@/features/card-gastos/ui';
import { CardSaldo } from '@/features/card-saldo/ui';
import { Saudacao } from '@/features/month-picker/ui/Saudacao';
import { getCarteira } from '@/shared/api/endpoints';
import { Card, CardContent } from '@/shared/ui/card';
import './ui.scss';

export default async function Dashboard() {
    const carteira = await getCarteira();

    return (
        <div
            className="grid grid-cols-12 gap-4
                        px-6 py-6 pt-4 md:px-8 lg:grid-cols-10 xl:grid-cols-12"
        >
            <div className="col-span-12 flex items-center lg:col-span-10 xl:col-start-2">
                <Saudacao />
                {/* <MonthPickerInput /> */}
            </div>
            <Card className="col-span-12rounded-md border lg:col-span-4 lg:row-start-2 xl:col-start-2">
                <CardContent className="flex h-12 justify-between gap-4 pt-6">
                    MonthPicker FILTRO
                </CardContent>
            </Card>
            <CardSaldo
                saldo={carteira.saldo}
                className="
                            col-span-12 lg:col-span-4 lg:row-start-3 xl:col-start-2"
            />
            <CardBalanco
                carteira={carteira}
                className="
                            col-span-12 lg:col-span-4 xl:col-start-2"
            />
            <CardGastos className="col-span-12 lg:col-span-6 lg:row-span-3 lg:row-start-2" />
        </div>
    );
}

export const metadata = {
    title: 'Pharus - Início',
};
