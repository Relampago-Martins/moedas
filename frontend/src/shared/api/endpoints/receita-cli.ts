'use server';
import { Receita, ReceitaSchema } from "@/types/models/receita";
import { ApiClient } from "../api-client";

export async function criaReceita(receita: ReceitaSchema){
    const resp = await ApiClient.getInstance().post<Receita>("/receitas/", receita);
    return resp;
}

export async function getReceita(id: number){
    const resp = await ApiClient.getInstance().get<Receita>(`/receitas/${id}/`,{
        next: {
            revalidate: 10,
            tags: [`getReceita${id}`],
        }
    });
    return resp.data;
}

export async function deleteReceita(id: number){
    const resp = await ApiClient.getInstance().delete(`/receitas/${id}/`);
    
    return resp;
}