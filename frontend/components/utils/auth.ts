'use client';
import { setUser } from "@/app/actions";
import { LoginForm, User } from "@/types/Auth";
import axios from "axios";

const API_URL = process.env.API_URL

export async function login(values: LoginForm, setInvalid: (invalid: boolean) => void){
    await axios(`${API_URL}/dj-rest-auth/login/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
        },
        data: JSON.stringify(values)
    }).then(response => {

        setInvalid(false)
        if(response.status === 200){
            const token = response.data.key
            getUser(token).then(user => {
                setUser({
                    token: token,
                    nome: user.first_name,
                    usuario: user.username,
                    email: user.email,
                } as User)
                window.location.href = '/dashboard'
            })
        }
    }).catch(error => {
        setInvalid(true)
    })
}

export async function getUser(token: string){
    const response = await axios(`${API_URL}/dj-rest-auth/user/`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Authorization': `token ${token}` 
        },
    })
    return response.data
}