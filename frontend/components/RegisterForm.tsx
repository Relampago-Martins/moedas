import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


const formSchema = z.object({
    username: z.string().min(2).max(25),
    nome_completo: z.string().min(2).max(45),
    email: z.string().email(),
    senha: z.string().min(6).max(50),
    confirmar: z.string().min(6).max(50),
}).refine(data => data.senha === data.confirmar, {
    message: "As senhas não coincidem",
    path: ["confirmar_senha"],
})

type FormType = z.infer<typeof formSchema>

export default function RegisterForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            nome_completo: "",
            email: "",
            senha: "",
            confirmar: "",
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(postRegister)} className="flex flex-col gap-4">
                <FormField 
                    control={form.control} name="username"
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
                    control={form.control} name="nome_completo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control} name="senha"
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
                <FormField 
                    control={form.control} name="confirmar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mt-4">Cadastrar</Button>
            </form>
        </Form>
    )
}

function postRegister(data: FormType) {
    console.log(data)
}