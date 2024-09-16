'use server';

import { Carteira } from "@/types/models";
import { ApiClient } from "../api-client";

export async function getCarteira(){
    return ApiClient.getInstance().get<Carteira>('/carteira/').then((response) => response.data);
    
}