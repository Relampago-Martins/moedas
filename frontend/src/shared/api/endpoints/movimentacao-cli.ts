'use server';

import { obj2SearchParams } from "@/shared/lib/utils";
import { Movimentacao } from "@/types/models/movimentacao";
import { ApiClient } from "../api-client";

type ListaMovsParams = {
    tipo?: "D" | "R", 
    periodo?: {
        periodo_after?: string;
        periodo_before?: string;
    }
}
export async function getMovimentacoes(props: ListaMovsParams) {
    const urlParams = obj2SearchParams(
        {
            tipo: props.tipo,
            periodo_after: props.periodo?.periodo_after,
            periodo_before: props.periodo?.periodo_before,
        }
    );
    const resp = await ApiClient.getInstance().get<Movimentacao[]>(
        `/movimentacoes/?${urlParams.toString()}`, 
        {cache: "no-store"}
    );
    return resp.data;
}