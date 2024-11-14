import { MobileHeader } from '@/entities/mobile-header';
import { ModalNovo } from '@/features/modal-novo/ui';
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
            <div className="w-full overflow-y-scroll">
                <MobileHeader />
                {children}
                <Toaster />
            </div>
            <ModalNovo />
        </main>
    );
}
