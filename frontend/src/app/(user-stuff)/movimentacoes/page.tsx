import { ItemGasto } from '@/features/card-gastos/ui/item-gasto';
import { getDespesas } from '@/shared/api/endpoints/despesa-cli';
import { Suspense } from 'react';

export default async function Page() {
    const despesas = await getDespesas();
    return (
        <div className="px-8 py-6">
            <h1 className="text-xl font-semibold leading-10 text-primary">
                Movimentações
            </h1>
            <p className="mb-6 text-zinc-500">
                Esta é a página de movimentações. Aqui você pode visualizar os
                seus gastos, ganhos, aplicações e outras movimentações.
            </p>
            <Suspense fallback={<div>Carregando...</div>}>
                <ul className="flex flex-col gap-2">
                    {despesas.map((despesa) => (
                        <ItemGasto key={despesa.id} gasto={despesa} />
                    ))}
                </ul>
            </Suspense>
        </div>
    );
}
