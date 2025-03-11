'use server';

import { obj2SearchParams } from "@/shared/lib/utils";
import { Categoria } from "@/types/models/categoria";
import { ApiClient } from "../api-client";


export async function getCategorias(tipo?: "D" | "R") {
    const urlParams = obj2SearchParams({
        tipo: tipo || undefined,
        
    });
    const resp = await ApiClient.getInstance().get<Categoria[]>(
        `/categorias/?${urlParams}`, 
        { next: { revalidate: 60, tags: ['categorias'] } }
    );
    return resp.data;
}

export async function getResumoCategorias() {
    const resp = await ApiClient.getInstance().get<Categoria[]>(
        `/categorias/meu-resumo/`, 
        { next: { revalidate: 60, tags: ['meu-resumo-categorias'] } }
    );
    return resp.data.sort((a, b) => a.total_gastos - b.total_gastos);
};



export async function getCategoria(sigla: string) {
    const resp = await ApiClient.getInstance().get<Categoria>(`/categorias/${sigla}/`, {
        next: { revalidate: 300, tags: [`categoria${sigla}`] }
    });
    return resp.data;
}