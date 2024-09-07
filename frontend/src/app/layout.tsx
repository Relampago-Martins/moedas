import { ThemeProvider } from '@/components/theme-provider';
import { inter } from '@/shared/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Prosper App',
    description: 'O seu app para controle financeiro',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
