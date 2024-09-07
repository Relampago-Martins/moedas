'use server';
import axios, { AxiosResponse } from 'axios';
import { APIUser, LoginForm, RegisterForm } from '../../types/auth';

const API_URL = process.env.API_URL;

export async function login(data: LoginForm) {
    const response = await axios(`${API_URL}/dj-rest-auth/login/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Accept-Language': 'pt-br',
        },
        data,
    });
    return response as AxiosResponse;
}

type LoginGoogleData = {
    id_token: string | undefined;
    access_token: string | undefined;
};

export async function loginGoogle(data: LoginGoogleData) {
    const response = await axios(`${API_URL}/dj-rest-auth/social/google/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Accept-Language': 'pt-br',
        },
        data,
    });
    return response as AxiosResponse<{ key: string }>;
}

export async function register(data: RegisterForm) {
    let resposeData = {
        status: 0,
        erros: {},
    };
    await axios(`${API_URL}/dj-rest-auth/registration/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Accept-Language': 'pt-br',
        },
        data: JSON.stringify(data),
    })
        .then((response: AxiosResponse) => {
            resposeData.status = response.status;
            resposeData.erros = {};
        })
        .catch((error) => {
            resposeData.status = error.response.status;
            resposeData.erros = error.response.data;
        });

    return resposeData;
}

export async function getUser(token: string) {
    const response = await axios(`${API_URL}/dj-rest-auth/user/`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Accept-Language': 'pt-br',
            Authorization: `token ${token}`,
        },
    });
    return response as AxiosResponse<APIUser>;
}
