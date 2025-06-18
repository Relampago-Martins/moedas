'use server';

import { Orcamento } from '@/types/models/orcamento';
import { ApiClient } from '../api-client';

export async function getOrcamento() {
    const resp = await ApiClient.getInstance().get<Orcamento[]>('/orcamento/');
    return resp.data[0];
}

export async function criarOrcamento(orcamento: Orcamento) {
    const resp = await ApiClient.getInstance().post<Orcamento>('/orcamento/', {
        ...orcamento,
    });
    return resp.data;
}

export async function atualizarOrcamento(orcamento: Orcamento) {
    const resp = await ApiClient.getInstance().patch<Orcamento>(
        `/orcamento/${orcamento.id}/`,
        orcamento,
    );
    return resp.data;
}

export async function deletarOrcamento(id: number) {
    const resp = await ApiClient.getInstance().delete(`/orcamento/${id}/`);
    return resp?.status === 204;
}
