'use server';

import { Estrategia } from '@/types/models/estrategia';
import { ApiClient } from '../api-client';

export async function getEstrategia() {
    const resp =
        await ApiClient.getInstance().get<Estrategia[]>('/estrategias/');
    return resp.data[0];
}

export async function criarEstrategia(estrategia: Estrategia) {
    const resp = await ApiClient.getInstance().post<Estrategia>(
        '/estrategias/',
        {
            ...estrategia,
        },
    );
    return resp.data;
}
