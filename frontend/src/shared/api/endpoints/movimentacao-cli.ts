'use server';

import { Movimentacao } from "@/types/models/movimentacao";
import { ApiClient } from "../api-client";

export async function listaMovimentacoes(tipo?: "D" | "R") {
    const urlParams = new URLSearchParams();
    if (tipo) {
        urlParams.append("tipo", tipo);
    }
    const resp = await ApiClient.getInstance().get<Movimentacao[]>(
        `/movimentacoes/?${urlParams}`
    );
    return resp.data;
}