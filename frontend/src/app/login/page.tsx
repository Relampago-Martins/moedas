import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import LoginForm from '@/components/auth/LoginForm';
import ThemeToggle from '@/components/themeToggle';
import { authConfig } from '@/shared/lib/auth';
import { Card } from '@/shared/ui/card';
import { Logo } from '@/shared/ui/custom/log';
import { Separator } from '@/shared/ui/separator';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Login() {
    const session = await getServerSession(authConfig);
    if (session) return redirect('/dashboard');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background">
            <Card
                className="flex h-fit w-full justify-center bg-opacity-10 px-10
            py-6 backdrop-blur-md sm:w-[31rem]"
            >
                <div className="flex w-full flex-col gap-4">
                    <div className="flex justify-center text-3xl font-semibold text-primary">
                        <Logo comNome />
                    </div>
                    <LoginForm />
                    <div className="flex flex-row items-center justify-center gap-6">
                        <Separator className="w-4 flex-grow" />
                        <span className="text-sm font-semibold text-muted">
                            OU
                        </span>
                        <Separator className="w-4 flex-grow" />
                    </div>
                    <GoogleSignInButton />
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted">
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
    );
}

export const metadata = {
    title: 'Pharus - Entrar',
};
