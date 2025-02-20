import { CardBalanco } from '@/features/card-balanco/ui';
import { CardGastos } from '@/features/card-gastos/ui';
import { CardSaldo } from '@/features/card-saldo/ui';
import { Saudacao } from '@/features/month-picker/ui/Saudacao';
import { Skeleton } from '@/shared/ui/skeleton';
import { Suspense } from 'react';
import './ui.scss';

export default function Dashboard() {
    return (
        <div
            className="grid grid-cols-12 gap-4
                        px-6 py-6 pt-4 md:px-8 lg:grid-cols-10 xl:grid-cols-12"
        >
            <div className="col-span-12 flex items-center lg:col-span-10 xl:col-start-2">
                <Suspense fallback={<Skeleton className="h-6 w-32" />}>
                    <Saudacao />
                </Suspense>
                {/* <MonthPickerInput /> */}
            </div>
            <Suspense
                fallback={
                    <Skeleton className="col-span-12 h-20 lg:col-span-4 lg:row-start-2 xl:col-start-2" />
                }
            >
                <CardSaldo className="col-span-12 lg:col-span-4 lg:row-start-2 xl:col-start-2" />
            </Suspense>
            <Suspense
                fallback={
                    <Skeleton className="col-span-12 h-40 lg:col-span-4 xl:col-start-2" />
                }
            >
                <CardBalanco className="col-span-12 lg:col-span-4 xl:col-start-2" />
            </Suspense>
            <Suspense
                fallback={
                    <Skeleton className="col-span-12 lg:col-span-6 lg:row-span-2 lg:row-start-2" />
                }
            >
                <CardGastos className="col-span-12 lg:col-span-6 lg:row-span-2 lg:row-start-2" />
            </Suspense>
        </div>
    );
}

export const metadata = {
    title: 'Pharus - Início',
};
