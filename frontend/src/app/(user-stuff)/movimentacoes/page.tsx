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
                <ul>
                    {despesas.map((despesa) => (
                        <li
                            key={despesa.id}
                            className="flex items-center gap-2"
                        >
                            <p>---&gt;</p>
                            <p>{despesa.descricao}</p>
                            <p>{despesa.valor}</p>
                            <p>{despesa.categoria}</p>
                            <p>{despesa.forma_pagamento}</p>
                        </li>
                    ))}
                </ul>
            </Suspense>
        </div>
    );
}
