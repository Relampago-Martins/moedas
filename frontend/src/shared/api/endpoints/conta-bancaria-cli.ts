'use server';

import { obj2SearchParams } from '@/shared/lib/utils';
import { Banco } from '@/types/models/banco';
import {
    ContaBancaria,
    ContaBancariaForm,
    ContaBancariaPreview,
} from '@/types/models/conta-bancaria';
import { revalidateTag } from 'next/cache';
import { ApiClient } from '../api-client';

export async function getContasBancarias() {
    const resp = await ApiClient.getInstance().get<ContaBancariaPreview[]>(
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

export async function getContaBancariaById(id: number) {
    const resp = await ApiClient.getInstance().get<ContaBancaria>(
        `/contas-bancarias/${id}/`,
        {
            next: {
                revalidate: 0,
                tags: ['minha-conta-bancaria', id.toString()],
            },
        },
    );

    return resp;
}

export async function createOrUpdateContaBancaria(
    id: number | undefined,
    contaBancaria: ContaBancariaForm,
) {
    if (id) {
        return updateContaBancaria(id, contaBancaria);
    }
    return createContaBancaria(contaBancaria);
}

export async function createContaBancaria(contaBancaria: ContaBancariaForm) {
    const resp = await ApiClient.getInstance().post<ContaBancariaPreview>(
        '/contas-bancarias/',
        contaBancaria,
    );
    revalidateTag('contas-bancarias');
    return resp;
}

export async function updateContaBancaria(
    id: number,
    contaBancaria: { apelido?: string; saldo?: string; banco_id?: number },
) {
    const resp = await ApiClient.getInstance().patch<ContaBancariaPreview>(
        `/contas-bancarias/${id}/`,
        contaBancaria,
    );
    revalidateTag('contas-bancarias');
    revalidateTag('minha-conta-bancaria');
    return resp;
}

export async function getBancos(search?: string) {
    const params = obj2SearchParams({
        nome__icontains: search,
    });
    const resp = await ApiClient.getInstance().get<Banco[]>(
        `/bancos/?${params.toString()}`,
        {
            next: {
                revalidate: 60,
                tags: ['bancos'],
            },
        },
    );

    return resp;
}

export async function deleteContaBancaria(id: number) {
    return ApiClient.getInstance()
        .delete(`/contas-bancarias/${id}/`)
        .then((resp) => {
            revalidateTag('contas-bancarias');
            return resp;
        });
}
