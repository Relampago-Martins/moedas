'use server';
import { User } from '@/types/Auth';
import { cookies } from 'next/headers';


/* armazena as informações do usuário nos cookies */
export async function setUser(user: User) {
    cookies().set('user', JSON.stringify(user), {
        path: '/',
        maxAge: 3600 * 4,
    });

    return user;
}

/* retorna as informações do usuário armazenadas nos cookies */
export async function getUser() {
    const cookie = cookies().get('user') 
    return cookie ? JSON.parse(cookie.value) : undefined;
}

/* remove as informações do usuário dos cookies */
export async function removeUser() {
    cookies().delete('user');
}

/* verifica se o usuário está logado */
export async function isLogged() {
    return cookies().has('user');
}
