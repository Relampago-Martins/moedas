import { AnimatedTabs } from '@/entities/animated-tabs/ui';

export default function Page() {
    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Playground
            </h1>
            <p className="text-zinc-500">
                Este é um playground. Você pode usar esta página para testar
                novas funcionalidades, componentes ou bibliotecas.
            </p>
            <div className="flex flex-col gap-8 py-4">
                <AnimatedTabs />
            </div>
        </div>
    );
}

export const metadata = {
    title: 'ProperApp - Playground de componentes',
};
