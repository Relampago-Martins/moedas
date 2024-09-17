import RegisterForm from '@/components/auth/RegisterForm';
import { authConfig } from '@/shared/lib/auth';
import { Card } from '@/shared/ui/card';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Signin() {
    const session = await getServerSession(authConfig);
    if (session) return redirect('/dashboard');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background">
            <Card
                className="flex h-fit w-full justify-center px-10
            py-6 shadow-md sm:w-[31rem]"
            >
                <div className="flex w-full flex-col gap-4">
                    <div className="flex justify-center text-3xl font-semibold text-primary">
                        Prosper
                    </div>
                    <RegisterForm />
                    <span className="mt-4 text-sm text-muted-foreground">
                        Já possui cadastro?
                        <Link href="/login">
                            <em className="text-primary"> Entre</em>
                        </Link>
                    </span>
                </div>
            </Card>
        </main>
    );
}
