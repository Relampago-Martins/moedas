import { CardCategorias } from '@/features/dashboard/card-categorias/ui';
import { CardEconomia } from '@/features/dashboard/card-economia/ui';
import { CardSaldo } from '@/features/dashboard/card-saldo/ui';
import { FiltroPeriodo } from '@/features/dashboard/card-saldo/ui/filtro-periodo';
import { Saudacao } from '@/features/month-picker/ui/Saudacao';
import { TFiltroPeriodo } from '@/types/filters';
import { Suspense } from 'react';
import { DashboardSkeleton } from './skeleton';
import './ui.scss';

export default function Dashboard({
    searchParams,
}: {
    searchParams: TFiltroPeriodo | {};
}) {
    return (
        <div
            className="grid grid-cols-12 gap-4
                        px-6 py-6 pt-4 md:px-8 lg:grid-cols-10 xl:grid-cols-12"
        >
            <Suspense fallback={<DashboardSkeleton />}>
                <div className="col-span-12 flex items-center lg:col-span-10 xl:col-start-2">
                    <Saudacao />
                </div>

                <div className="col-span-12 flex flex-col gap-2 lg:col-span-10 lg:row-start-2 xl:col-start-2">
                    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                        <FiltroPeriodo />
                    </div>
                </div>

                <CardSaldo
                    params={searchParams}
                    className="col-span-12 row-span-1 gap-2 lg:col-span-5 lg:row-start-3 xl:col-span-4 xl:col-start-2"
                />

                <CardEconomia
                    params={searchParams}
                    className="col-span-12 lg:col-span-5 lg:row-start-4 xl:col-span-4 xl:col-start-2"
                />

                <CardCategorias
                    params={searchParams}
                    className="col-span-12 lg:col-span-5 lg:row-span-2 lg:row-start-3 xl:col-span-3"
                />
            </Suspense>
        </div>
    );
}

export const metadata = {
    title: 'Pharus - Início',
};
