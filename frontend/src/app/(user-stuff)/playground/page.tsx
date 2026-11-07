import { AnimatedPlayground } from '@/entities/animated-playground';
import { AnimatedTabs } from '@/entities/animated-tabs/ui';

export default function Page() {
    return (
        <div className="px-6 py-6 md:px-8">
            <h1 className="text-xl leading-10 font-semibold text-primary">
                Playground
            </h1>
            <p className="text-muted-foreground">
                Este é um playground. Você pode usar esta página para testar
                novas funcionalidades, componentes ou bibliotecas.
            </p>
            <div className="flex flex-col gap-8 py-4">
                <AnimatedTabs />

                <AnimatedPlayground />
            </div>
        </div>
    );
}

export const metadata = {
    title: 'Pharus - Playground de componentes',
};
