import { loginForm } from "@/components/utils/zodForms";
import * as z from "zod";

export type User = {
    token: string,
    nome: string,
    usuario: string,
    email: string,
}

export type LoginForm = z.infer<typeof loginForm>