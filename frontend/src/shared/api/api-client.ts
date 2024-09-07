import { MySession } from "@/types/auth";
import { CustomFetchProps, CustomResponse } from "@/types/http";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authConfig } from "../lib/auth";


/**
 * Singleton class to manage the API instance
 */
export class ApiClient {
    private static instance: ApiClient;
    private apiUrl = process.env.API_URL;
    private headers: HeadersInit = {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        'Accept-Language': 'pt-br',
    };

    private constructor() {
        if (!this.apiUrl) {
            throw new Error("API URL or API Key is not defined in the next.config environment variables.");
        }
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    /**
     * Faz uma requisição GET para a API
     * @param url URL da API com search params já incluídos (ex: /users?name=John)
     * @param config Configurações da requisição
     * @template T Tipo do retorno da requisição
     * @returns Promise com o resultado da requisição
     */
    public async get<T>(url: string, init?: CustomFetchProps){
        const { cache, ...config } = init || {};
        const resp = await fetch(
            `${this.apiUrl}${url}`,
            {
                method: "GET",
                headers: await this.getHeaders(),
                cache: cache || "no-cache",
                ...config,
            }
        );

        return this.responseHandler<T>(resp) as Promise<{ status: number, data: T }>;
    }

    /**
     *  Faz uma requisição POST para a API
     * @param url URL da API
     * @param body Corpo da requisição
     * @param config Configurações da requisição
     * @returns Promise com o resultado da requisição
     * @template T Tipo do retorno da requisição
     */
    public async post<T>(url: string, body: RequestInit | object, init?: Omit<CustomFetchProps, 'body'>){
        const csrf = cookies().get('csrftoken')?.value;

        const resp = await fetch(
            `${this.apiUrl}${url}`,
            {
                method: "POST",
                headers: {
                    ...await this.getHeaders(),
                    "X-CSRF-Token": csrf || "",
                },
                body: JSON.stringify(body),
                ...init,
            }
        );
        
        return this.responseHandler<T>(resp);
    }


    /**
     * Faz uma requisição DELETE para a API
     * @param url URL da API
     * @param config Configurações da requisição
     * @returns Promise com o resultado da requisição
     * @template T Tipo do retorno da requisição
     */
    public async delete(url: string, config?: CustomFetchProps){
        const resp = await fetch(
            `${this.apiUrl}${url}`,
            {
                method: "DELETE",
                headers: await this.getHeaders(),
                ...config,
            }
        );

        if (resp.status === 204) {
            return { status: resp.status, data: null};
        }

    }

    // protected abstract put<T>(url: string, body: CustomFetchProps['body'], config: Omit<CustomFetchProps, 'body'>): Promise<T>;
    // protected abstract patch<T>(url: string, body: CustomFetchProps['body'], config: Omit<CustomFetchProps, 'body'>): Promise<T>;
    public async options<T>(url: string, config: CustomFetchProps){
        const resp = await fetch(
            `${this.apiUrl}${url}`,
            {
                method: "OPTIONS",
                headers: await this.getHeaders(),
                ...config,
            }
        );

        return this.responseHandler<T>(resp) as Promise<{ status: number, data: T }>;
    }

    private async responseHandler<T>(response: Response){
        const res = response as CustomResponse<T>; 

        if ([200, 201, 400].includes(res.status)) {
            const data = await res.json();
            return { status: res.status, data: data };
        }
        throw new Error(res.statusText);
    }

    private async getAuthToken(){
        const session = (await getServerSession(authConfig)) as MySession;
        return session?.apiKey;
    }

    private async getHeaders(){
        return {
            ...this.headers,
            Authorization: `Token ${await this.getAuthToken()}`
        };
    }
}