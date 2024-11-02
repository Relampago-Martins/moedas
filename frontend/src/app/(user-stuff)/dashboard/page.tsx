import { CardBalanco } from '@/features/card-balanco/ui';
import { CardGastos } from '@/features/card-gastos/ui';
import { CardSaldo } from '@/features/card-saldo/ui';
import { MonthPicker } from '@/features/month-picker/ui';
import { getCarteira } from '@/shared/api/endpoints';
import { loginIsRequiredServer } from '@/shared/lib/auth';
import './ui.scss';

export default async function Dashboard() {
    await loginIsRequiredServer(); // TODO: substituir por um middleware
    const carteira = await getCarteira();

    return (
        <div
            className="grid grid-cols-12 gap-4
                        px-6 py-6 pt-4 md:px-8 lg:grid-cols-10 xl:grid-cols-12"
        >
            <MonthPicker className="col-span-12 lg:col-span-10 xl:col-start-2" />
            <CardSaldo
                saldo={carteira.saldo}
                className="
                            col-span-12 lg:col-span-4 lg:row-start-2 xl:col-start-2"
            />
            <CardBalanco
                carteira={carteira}
                className="
                            col-span-12 lg:col-span-4 xl:col-start-2"
            />
            <CardGastos
                className="
                            col-span-12 lg:col-span-6 lg:row-span-2 lg:row-start-2"
            />
        </div>
    );
}

export const metadata = {
    title: 'Pharus - Início',
};
