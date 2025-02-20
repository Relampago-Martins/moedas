'use server';

import { authConfig } from "@/shared/lib/auth";
import { APIUser, MySession } from "@/types/auth";
import { getServerSession } from "next-auth";
import { ApiClient } from "../api-client";

export async function getCurrentUser(){
    return await ApiClient.getInstance().get<APIUser>(`/dj-rest-auth/user/`, {
        next: { revalidate: 60 , tags: ['getCurrentUser'] }
    })
    .then((response) => response.data);

}

export async function getIsLoggedIn(){
    const session = (await getServerSession(authConfig)) as MySession;
    return session?.user ? true : false;
}