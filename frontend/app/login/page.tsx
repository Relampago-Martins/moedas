import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import LoginForm from "@/components/auth/LoginForm";
import ThemeToggle from "@/components/themeToggle";
import { authConfig } from "@/shared/lib/auth";
import { Card } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login(){
    const session = await getServerSession(authConfig);
    if (session) return redirect('/dashboard');

    return (
        <main className="min-h-screen flex flex-col bg-background items-center justify-center">
            <Card className="flex w-[31rem] h-fit backdrop-blur-md bg-opacity-10
            justify-center py-6 px-10">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-center text-3xl text-primary font-semibold">
                        Moedas
                    </div>
                    <LoginForm/>
                    <div className="flex flex-row justify-center items-center gap-6">
                        <Separator className="w-4 flex-grow"/>
                        <span className="text-sm text-muted-foreground font-semibold">
                            OU
                        </span>
                        <Separator className="w-4 flex-grow"/>
                    </div>
                    <GoogleSignInButton/>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-muted-foreground">
                            Não possui cadastro?
                            <Link href="/signin">
                                <em className="text-primary"> Cadastre-se</em>
                            </Link>
                        </span>
                        <ThemeToggle />
                    </div>
                </div>
            </Card>
        </main>
    )
}

export const metadata = {
    title: 'Moedas - Entrar',
}