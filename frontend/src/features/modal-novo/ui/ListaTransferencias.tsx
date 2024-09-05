import { Card } from '@/shared/ui/card';
import { GastoIcon } from '@/shared/ui/icons/gasto';
import { ReceitaIcon } from '@/shared/ui/icons/receita';
import Link from 'next/link';

export function ListaTransferencias() {
    return (
        <div className="flex flex-row justify-center gap-4">
            <Link href="/dashboard/novo?step=gasto">
                <Card
                    className="flex h-[5.5rem] w-[6.5rem] cursor-pointer
                        flex-col items-center justify-center transition-transform
                        duration-300 hover:scale-105
                     "
                >
                    <GastoIcon className="h-8 w-8 text-red-600" />
                    <span className="text-base font-medium">Gasto</span>
                </Card>
            </Link>
            <Card
                className="flex h-[5.5rem] w-[6.5rem] cursor-pointer
                        flex-col items-center justify-center transition-transform
                        duration-300 hover:scale-105
                     "
            >
                <ReceitaIcon className="h-8 w-8 text-green-600" />
                <span className="text-base font-medium">Receita</span>
            </Card>
        </div>
    );
}
