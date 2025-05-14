'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const path = usePathname();

    return (
        <div className="px-6 py-6 md:px-8">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Plano financeiro
            </h1>
            <p className="text-muted">
                Aqui você pode visualizar e editar seu plano financeiro.
            </p>
            <div className="flex max-w-[1000px] flex-col gap-3 pt-4">
                <div className="flex items-center gap-8">
                    <TabsItem
                        active={path === '/plano-financeiro'}
                        path="/plano-financeiro"
                    >
                        Orçamento
                    </TabsItem>
                    <TabsItem
                        active={path === '/plano-financeiro/metas'}
                        path="/plano-financeiro/metas"
                    >
                        Metas
                    </TabsItem>
                    <TabsItem
                        active={path === '/plano-financeiro/estrategias'}
                        path="/plano-financeiro/estrategias"
                    >
                        Estratégias
                    </TabsItem>
                    <h1 className="text-lg text-muted">Dívidas</h1>
                    <h1 className="text-lg text-muted">Fundos</h1>
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
