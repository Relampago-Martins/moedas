import { MobileHeader } from '@/entities/mobile-header';
import { ModalNovo } from '@/features/modal-novo/ui';
import { DockNovo } from '@/features/modal-novo/ui/dock-novo';
import { SideBar } from '@/features/side-bar/ui';
import { Toaster } from '@/shared/ui/toaster';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Pharus',
    description: 'O seu app para controle financeiro',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen w-full flex-row bg-background">
            <SideBar />
            {/* `pb-24`: espaço para a dock não cobrir o fim da página. */}
            <div className="w-full overflow-y-scroll pb-24">
                <MobileHeader />
                {children}
                <Toaster />
            </div>
            <ModalNovo />
            <DockNovo />
        </main>
    );
}
