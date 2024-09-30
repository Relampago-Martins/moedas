'use server';
import { Receita, ReceitaSchema } from "@/types/models/receita";
import { revalidateTag } from "next/cache";
import { ApiClient } from "../api-client";

export async function criaReceita(receita: ReceitaSchema){
    const resp = await ApiClient.getInstance().post<Receita>("/receitas/", receita);
    return resp;
}

export async function getReceita(id: number){
    const resp = await ApiClient.getInstance().get<Receita>(`/receitas/${id}/`,{
        next: {
            revalidate: 100,
            tags: [`getReceita${id}`],
        }
    });
    return resp.data;
}

export async function deleteReceita(id: number){
    const resp = await ApiClient.getInstance().delete(`/receitas/${id}/`);
    revalidateTag(`getReceita${id}`);
    return resp;
}

export async function atualizaReceita(id: number, receita: ReceitaSchema){
    const resp = await ApiClient.getInstance().patch<Receita>(`/receitas/${id}/`, receita);
    revalidateTag(`getReceita${id}`);
    return resp;
}