import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export  default async function TesteLogin() {
    const session = await getServerSession(authConfig);

    if (session) {
        return (
            <div>
                <h1>Olá, {session?.user?.name}</h1>
                <p>Seu email é {session?.user?.email}</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Você não está logado</h1>
        </div>
    )
}