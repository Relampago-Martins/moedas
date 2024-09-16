'use server';
import { Receita, ReceitaSchema } from "@/types/models/receita";
import { ApiClient } from "../api-client";

export async function criaReceita(receita: ReceitaSchema){
    const resp = await ApiClient.getInstance().post<Receita>("/receitas/", receita);
    return resp;
}