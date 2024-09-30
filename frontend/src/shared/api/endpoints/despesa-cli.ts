'use server';
import { Despesa, DespesaConfig, DespesaSchema } from "@/types/models/despesa";
import { revalidateTag } from "next/cache";
import { ApiClient } from "../api-client";

export async function getDespesas(){
    const resp = await ApiClient.getInstance().get<Despesa[]>("/despesas/");
    return resp.data.map((despesa) => {
        return {
            ...despesa,
        }
    });
}

export async function getDespesa(id: number){
    const resp = await ApiClient.getInstance().get<Despesa>(`/despesas/${id}/`, {
        next: {
            revalidate: 100,
            tags: [`getDespesa${id}`],
        }
    });
    return resp.data;
}

export async function criaDespesa(despesa: DespesaSchema){
    const resp = await ApiClient.getInstance().post<Despesa>("/despesas/", despesa);
    return resp;
}

export async function atualizaDespesa(id: number, despesa: DespesaSchema){
    const resp = await ApiClient.getInstance().patch<Despesa>(`/despesas/${id}/`, despesa);
    revalidateTag(`getDespesa${id}`);
    return resp;
}


export async function getDespesaConfigs(){
    const resp = await ApiClient.getInstance().options<DespesaConfig>("/despesas/",{
        cache: "force-cache",
    });
    return resp.data;
}

export async function deleteDespesa(id: number){
    const resp = await ApiClient.getInstance().delete(`/despesas/${id}/`);
    revalidateTag(`getDespesa${id}`);
    return resp;
}