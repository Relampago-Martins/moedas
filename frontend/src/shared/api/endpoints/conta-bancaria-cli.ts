'use server';

import { ContaBancaria } from '@/types/models/conta-bancaria';
import { ApiClient } from '../api-client';

export async function getContasBancarias() {
    const resp =
        await ApiClient.getInstance().get<ContaBancaria[]>(
            '/contas-bancarias/',
        );
    return resp;
}
