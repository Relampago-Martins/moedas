import { CardBalanco } from '@/features/card-balanco/ui';
import { CardContas } from '@/features/card-contas/ui';
import { CardSaldo } from '@/features/card-saldo/ui';
import { MonthPicker } from '@/features/month-picker/ui';
import { SideBar } from '@/features/side-bar/ui';
import { OuterProvider, OuterTrigger } from '@/features/side-bar/ui/NavBar';
import { loginIsRequiredServer } from '@/shared/lib/auth';
import { FaBars } from 'react-icons/fa6';
import './ui.scss';

export default async function Dashboard() {
    await loginIsRequiredServer();

    return (
        <main className="flex h-full min-h-screen w-full flex-row bg-background">
            <OuterProvider>
                <SideBar />
                <div className="w-full">
                    <div className="flex flex-row justify-between border-b border-gray-200 px-7 py-2 text-primary md:hidden">
                        <OuterTrigger className="flex items-center gap-4 hover:cursor-pointer">
                            <FaBars className="text-lg" />
                            <span className="text-lg font-semibold">
                                Moedas
                            </span>
                        </OuterTrigger>
                    </div>
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
                        <CardContas
                            className="
                            col-span-12 lg:col-span-6 lg:row-span-2 lg:row-start-2"
                        />
                    </div>
                </div>
            </OuterProvider>
        </main>
    );
}

export const metadata = {
    title: 'Moedas Dashboard',
};
