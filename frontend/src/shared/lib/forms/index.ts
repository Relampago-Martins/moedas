import i18next from 'i18next';
import * as z from "zod";
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/pt/zod.json';

/** 
 * definindo a linguagem da engine de validação dos formulários
 * */ 
i18next.init({
    lng: "pt",
    resources: {
        pt: { zod: translation },
    },
});
z.setErrorMap(zodI18nMap);

export const loginForm = z.object({
    username: z.string().min(1, { message: "Usuário é obrigatório" }),
    password: z.string().min(1, { message: "Senha é obrigatório"}),
}).required()

export const registerForm = z.object({
    username: z.string().min(1, "Usuário é obrigatório"),
    email: z.string().email(),
    password1: z.string().min(8, 'Senha deve conter pelo menos 8 caracter(es)').max(50),
    password2: z.string().min(8, 'Senha deve conter pelo menos 8 caracter(es)').max(50),
}).refine(data => data.password1 === data.password2, {
    message: "As senhas não coincidem",
    path: ["password2"],
})

export const despesa = z.object({
    id: z.number().optional(),
    data: z.string().optional(),
    descricao: z.string().min(1, { message: 'Descrição é obrigatória' }).max(255),
    valor: z.number().min(0.01, { message: 'Valor deve ser maior que 0' }),
    categoria: z.string().min(1, { message: 'Categoria é obrigatória' }),
    forma_pagamento: z.string().min(1, { message: 'Categoria é obrigatória' }),
});