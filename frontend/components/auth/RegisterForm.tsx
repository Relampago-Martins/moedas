'use client';
import { register } from "@/shared/lib/fetchAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import BeatLoader from 'react-spinners/BeatLoader';
import { registerForm } from "../../shared/lib/zodForms";
import { Button } from "../../shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../shared/ui/form";
import { Input } from "../../shared/ui/input";
import { APIRegisterFormErrors, RegisterForm } from "../../types/auth";
import { list2Ul } from "../utils";


export default function RegisterForm() {
    const [backendErrors, setBackendErrors] = useState<APIRegisterFormErrors>({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerForm),
        defaultValues:{
            username: "",
            email: "",
            password1: "",
            password2: "",
        }
    })

    const handleSubmit = async (registerData: RegisterForm) => {
        setLoading(true)
        const resp =  await register(registerData)
        console.log(resp)
        if (resp.status === 204 || resp.status === 201 || resp.status === 200) {
            router.push('/login', { message: 'Usuário cadastrado com sucesso'} as NavigateOptions )
        }
        else if (resp.status === 400) {
            setBackendErrors(resp.erros)
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField 
                    control={form.control} name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{list2Ul(backendErrors?.username)}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control} name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="noreply@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage>{list2Ul(backendErrors?.email)}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control} name="password1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage>{list2Ul(backendErrors?.password1)}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control} name="password2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage>{list2Ul(backendErrors?.password2)}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormMessage>{list2Ul(backendErrors?.non_field_errors)}</FormMessage>
                <Button type="submit" className="gap-2">
                    {loading ? 'Carregando' : 'Cadastrar'}
                    <BeatLoader loading={loading} size={6} color="white" />
                </Button>
            </form>
        </Form>
    )
}