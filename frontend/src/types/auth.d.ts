import { loginForm, registerForm } from "@/shared/lib/zodForms";
import { Session, User } from "next-auth";
import * as z from "zod";


export interface MyUser extends User {
    token: string,
}

export type APIUser = { 
    pk: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
}

export type MySession = Session & {
    apiKey: string,
}

export type LoginForm = z.infer<typeof loginForm>

export type RegisterForm = z.infer<typeof registerForm>

export type APIRegisterFormErrors = {
    username?: string[],
    email?: string[],
    password1?: string[],
    password2?: string[],
    non_field_errors?: string[],
}

export type APILoginFormErrors = {
    username?: string[],
    password?: string[],
    non_field_errors?: string[],
}
