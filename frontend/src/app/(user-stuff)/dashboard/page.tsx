import { CardBalanco } from '@/features/card-balanco/ui';
import { CardGastos } from '@/features/card-gastos/ui';
import { CardSaldo } from '@/features/card-saldo/ui';
import { MonthPicker } from '@/features/month-picker/ui';
import { loginIsRequiredServer } from '@/shared/lib/auth';
import './ui.scss';

export default async function Dashboard() {
    await loginIsRequiredServer(); // TODO: substituir por um middleware

    return (
        <div
            className="
                        grid grid-cols-12 gap-4 p-6 pt-4 lg:grid-cols-10 xl:grid-cols-12"
        >
            <MonthPicker className="col-span-12 lg:col-span-10 xl:col-start-2" />
            <CardSaldo
                className="
                            col-span-12 lg:col-span-4 lg:row-start-2 xl:col-start-2"
            />
            <CardBalanco
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
    title: 'ProperApp - Início',
};
