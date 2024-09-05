import RegisterForm from "@/components/auth/RegisterForm";
import { authConfig } from "@/shared/lib/auth";
import { Card } from "@/shared/ui/card";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Signin(){
    const session = await getServerSession(authConfig);
    if (session) return redirect('/dashboard');

    return (
        <main className="min-h-screen flex flex-col bg-background items-center justify-center">
            <Card className="flex w-[31rem] h-fit shadow-md
            justify-center py-6 px-10">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-center text-3xl text-primary font-semibold">
                        Moedas
                    </div>
                    <RegisterForm/>
                    <span className="text-sm text-muted-foreground mt-4">
                        Já possui cadastro?
                        <Link href="/login">
                            <em className="text-primary"> Entre</em>
                        </Link>
                    </span>
                </div>
            </Card>
        </main>
    )
}