'use client';
import { FiltroPeriodo } from '@/features/dashboard/card-saldo/ui/filtro-periodo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    return (
        <div className="px-6 py-6 md:px-8 xl:px-36">
            <div className="mb-6 flex items-center gap-2 text-primary ">
                <i className="ph ph-crosshair flex text-2xl" />
                <h1 className="text-xl font-semibold leading-10">Orçamento</h1>
            </div>

            <FiltroPeriodo className="" />

            <div className="flex max-w-full flex-col gap-3 pt-4">
                <div className="flex items-center gap-8">
                    <TabsItem active={path === '/orcamento'} path="/orcamento">
                        Gastos
                    </TabsItem>
                    <TabsItem
                        active={path === '/orcamento/investimentos'}
                        path="/orcamento/investimentos"
                    >
                        Investimentos
                    </TabsItem>
                    <TabsItem
                        active={path === '/orcamento/estrategias'}
                        path="/orcamento/estrategias"
                    >
                        Estratégias
                    </TabsItem>
                </div>
                {children}
            </div>
        </div>
    );
}

type TabsItemProps = {
    children: React.ReactNode;
    active: boolean;
    path: string;
};

function TabsItem({ children, active, path }: TabsItemProps) {
    if (!active) {
        return (
            <Link href={path} className="text-lg text-muted">
                {children}
            </Link>
        );
    }
    return (
        <span
            className="border-b-2 border-primary text-lg font-medium text-primary"
            aria-disabled
        >
            {children}
        </span>
    );
}
