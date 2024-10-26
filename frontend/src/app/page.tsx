import { authConfig } from '@/shared/lib/auth';
import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
        permanentRedirect('/login');
    }

    permanentRedirect('/dashboard');
}

export const metadata = {
    title: 'Pharus - Início',
};
