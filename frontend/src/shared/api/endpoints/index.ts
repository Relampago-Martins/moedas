'use server';

import { obj2SearchParams } from '@/shared/lib/utils';
import { TFiltroPeriodo } from '@/types/filters';
import { Carteira } from '@/types/models';
import { ApiClient } from '../api-client';

export async function getCarteira(
    params: TFiltroPeriodo | {},
): Promise<Carteira> {
    const urlParams = obj2SearchParams(params || {});

    const carteira = await ApiClient.getInstance()
        .get<Carteira>(`/carteira/?${urlParams.toString()}`)
        .then((response) => response.data);

    const totalReceitas = carteira.total_receitas;
    const saldoRestante = totalReceitas - carteira.total_despesas;
    const percentual = (saldoRestante / totalReceitas) * 100;
    return { ...carteira, percentualEconomia: percentual };
}
