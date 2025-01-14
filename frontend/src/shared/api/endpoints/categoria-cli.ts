'use server';

import { Categoria } from "@/types/models/categoria";
import { ApiClient } from "../api-client";

export async function getCategorias(tipo?: "D" | "R") {
    const urlParams = new URLSearchParams();
    if (tipo) {
        urlParams.append("tipo", tipo);
    }
    const resp = await ApiClient.getInstance().get<Categoria[]>(
        `/categorias/?${urlParams}`
    );
    return resp.data.sort((a, b) => a.total_gastos - b.total_gastos);
}

export async function getCategoria(sigla: string) {
    const resp = await ApiClient.getInstance().get<Categoria>(`/categorias/${sigla}/`);
    return resp.data;
}