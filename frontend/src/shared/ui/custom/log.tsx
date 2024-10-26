'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

type LogoProps = {
    comNome?: boolean;
};

export function Logo({ comNome = false }: LogoProps) {
    const theme = useTheme();
    if (comNome) {
        return theme.theme === 'dark' ? (
            <Image
                src="logo-nome-dark.svg"
                alt="Pharus"
                width={120}
                className="w-full pr-10"
                height={40}
            />
        ) : (
            <Image
                src="logo-nome.svg"
                alt="Pharus"
                width={120}
                height={40}
                className="w-full pr-10"
            />
        );
    }

    return theme.theme === 'dark' ? (
        <Image src="logo-pharus-dark.svg" alt="Pharus" width={40} height={40} />
    ) : (
        <Image src="logo-pharus.svg" alt="Pharus" width={40} height={40} />
    );
}
