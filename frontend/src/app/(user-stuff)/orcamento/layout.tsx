'use client';
import { FiltroPeriodo } from '@/features/dashboard/card-saldo/ui/filtro-periodo';
import { ModalLimiteGastos } from '@/features/plano-financeiro/modal-limite-gastos';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    return (
        <div className="flex h-screen flex-col gap-4 px-6 py-6 md:px-8 xl:px-36">
            <div className="flex items-center gap-2 text-primary ">
                <i className="ph ph-crosshair flex text-2xl" />
                <h1 className="text-xl font-semibold leading-10">Orçamento</h1>
            </div>

            <FiltroPeriodo className="" />

            <div className="flex h-full flex-wrap justify-between gap-8 sm:flex-nowrap">
                <div className="flex h-full w-full flex-col gap-4">
                    <div className="flex items-center gap-8">
                        <TabsItem
                            active={path === '/orcamento'}
                            path="/orcamento"
                        >
                            Gastos
                        </TabsItem>
                        <TabsItem
                            active={path === '/orcamento/investimentos'}
                            path="/orcamento/investimentos"
                        >
                            Investimentos
                        </TabsItem>
                    </div>
                    {children}
                </div>

                <Card className="sm:w-[400px] ">
                    <CardHeader className="flex h-8 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted">
                        <span className="text-sm">Limite de gastos</span>
                    </CardHeader>
                    <CardContent className="flex h-full w-full items-center justify-center">
                        <ModalLimiteGastos className="flex items-center gap-2 text-muted">
                            <i className="ph ph-plus-circle text-2xl"></i>
                            <span className="">Adicionar</span>
                        </ModalLimiteGastos>
                    </CardContent>
                </Card>
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
