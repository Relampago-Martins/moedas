import { ThemeProvider } from '@/components/theme-provider';
import { inter } from '@/shared/lib/fonts';
import ReactQueryProvider from '@/shared/ui/react-query-provider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Pharus',
    description: 'O seu app para controle financeiro',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css"
                ></link>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css"
                ></link>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/thin/style.css"
                ></link>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
