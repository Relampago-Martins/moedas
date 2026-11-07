'use client';
import { FiltroPeriodo } from '@/features/dashboard/card-saldo/ui/filtro-periodo';
import { ModalLimiteGastos } from '@/features/plano-financeiro/modal-limite-gastos';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    return (
        <div className="flex h-screen flex-col gap-4 px-6 py-6 md:px-8 xl:px-36">
            <div className="flex items-center gap-2 text-primary">
                <i className="ph ph-crosshair flex text-2xl" />
                <h1 className="text-xl leading-10 font-semibold">Orçamento</h1>
            </div>

            <Suspense>
                <FiltroPeriodo className="" />
            </Suspense>

            <div className="flex flex-col gap-4 sm:h-full sm:flex-row sm:justify-between sm:gap-8">
                <div className="flex w-full flex-col gap-4 sm:h-full">
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

                {/* no celular o limite vem antes da lista, para não ficar escondido no fim da página */}
                <Card className="order-first flex w-full flex-col sm:order-none sm:w-[400px] sm:shrink-0">
                    <CardHeader className="flex h-8 shrink-0 flex-row items-center gap-1.5 border-b px-4 py-0 text-muted-foreground">
                        <span className="text-sm">Limite de gastos</span>
                    </CardHeader>
                    <CardContent className="flex w-full items-center justify-center py-4 sm:h-full">
                        <ModalLimiteGastos className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:bg-accent" />
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
            <Link href={path} className="text-lg text-muted-foreground">
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
