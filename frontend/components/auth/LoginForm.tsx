'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { loginForm } from "../../lib/zodForms";
import { LoginForm } from "../../types/auth";
import { Input } from "../ui/input";

export default function LoginForm() {
    const [responseError, setResponseError] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginForm),
        defaultValues: {
          username: "",
          password: "",
        },
    })

    const handleSubmit = async (val: LoginForm) => {
        setLoading(true)
        const signInResponse = await signIn("credentials", {
            username: val.username,
            password: val.password,
            redirect: false,
        })
        if (signInResponse && !signInResponse?.error){
            router.push('/dashboard')
        }else{
            setResponseError('Usuário ou senha inválidos')
        }
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(handleSubmit)} >
                <FormField 
                    control={form.control} 
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control} 
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage></FormMessage>
                        </FormItem>
                    )}
                />
                {!!responseError &&  <FormMessage>{responseError}</FormMessage>}

                <Button type="submit" className="gap-2">
                    {loading ? "Entrando" : "Entrar"}
                    <BeatLoader loading={loading} size={6} color="white" />
                </Button>
            </form>
        </Form>
    )
}
