'use server';

import { obj2SearchParams } from "@/shared/lib/utils";
import { TFiltroPeriodo } from "@/types/filters";
import { Carteira } from "@/types/models";
import { ApiClient } from "../api-client";

export async function getCarteira(params: TFiltroPeriodo | {}){
    const urlParams = obj2SearchParams(params || {});
    return ApiClient.getInstance().get<Carteira>( `/carteira/?${urlParams.toString()}`,
        // { next: {
        //     revalidate: 60,
        //     tags: ['carteira', urlParams.toString()]
        // }}
    ).then((response) => response.data);
    
}