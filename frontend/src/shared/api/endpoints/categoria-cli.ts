'use server';

import { obj2SearchParams } from "@/shared/lib/utils";
import { TFiltroPeriodo } from "@/types/filters";
import { Categoria, CategoriaTotalMov } from "@/types/models/categoria";
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

type ResumoCategoriasProps = TFiltroPeriodo & {
    tipo?: "D" | "R";
    
}

export async function getCategoriasTotalMovs(params: ResumoCategoriasProps) {
    const urlParams = obj2SearchParams(params);
    const resp = await ApiClient.getInstance().get<CategoriaTotalMov[]>(
        `/categorias/total-movimentacoes/?${urlParams}`, 
        { next: { revalidate: 60, tags: ['categorias-total-movimentacoes'] } }
    );
    return resp.data;
};



export async function getCategoria(sigla: string) {
    const resp = await ApiClient.getInstance().get<Categoria>(`/categorias/${sigla}/`, {
        next: { revalidate: 300, tags: [`categoria${sigla}`] }
    });
    return resp.data;
}