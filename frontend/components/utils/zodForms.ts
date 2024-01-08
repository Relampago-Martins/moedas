import * as z from "zod";


export const loginForm = z.object({
    username: z.string().min(1, { message: "Usuário é obrigatório" }),
    password: z.string().min(1, { message: "Senha é obrigatório"}),
}).required()
