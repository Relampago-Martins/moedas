'use client';
import googleLogo from '@/public/google.png';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GoogleSignInButton() {
    const onClick = () => {
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <button
            onClick={onClick}
            className="flex flex-row items-center justify-center rounded-lg border p-2"
        >
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
            <span className="ml-4">Entrar com o Google</span>
        </button>
    );
}
