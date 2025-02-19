'use server';

import { APIUser } from "@/types/auth";
import { ApiClient } from "../api-client";

export async function getCurrentUser(){
    return await ApiClient.getInstance().get<APIUser>(`/dj-rest-auth/user/`, {
        next: { revalidate: 60 , tags: ['getCurrentUser'] }
    })
    .then((response) => response.data);

}