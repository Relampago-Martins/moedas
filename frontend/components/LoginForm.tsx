'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginForm } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { login } from "./utils/auth";
import { loginForm } from "./utils/zodForms";


export default function LoginForm() {
    const [invalid, setInvalid] = useState(false)
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginForm),
        defaultValues: {
          username: "",
          password: "",
        },
    })

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4"
                onSubmit={form.handleSubmit((val) => login(val, setInvalid))} >
                <FormField 
                    control={form.control} 
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
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
                        <FormMessage/>
                        </FormItem>
                    )}
                />
                {invalid && <FormMessage>Usuário ou senha inválidos</FormMessage>}
                <Button type="submit" className="mt-4">Entrar</Button>
            </form>
        </Form>
    )
}
