'use server';

import { ContaBancaria } from '@/types/models/conta-bancaria';
import { revalidateTag } from 'next/cache';
import { ApiClient } from '../api-client';

export async function getContasBancarias() {
    const resp = await ApiClient.getInstance().get<ContaBancaria[]>(
        '/contas-bancarias/',
        {
            next: {
                revalidate: 60,
                tags: ['contas-bancarias'],
            },
        },
    );

    return resp;
}

export async function createContaBancaria(contaBancaria: {
    nome_banco: string;
    saldo: string;
    apelido: string;
}) {
    const resp = await ApiClient.getInstance().post<ContaBancaria>(
        '/contas-bancarias/',
        contaBancaria,
    );
    revalidateTag('contas-bancarias');
    return resp;
}
