import { withAuth } from 'next-auth/middleware';

// refs: https://next-auth.js.org/configuration/nextjs
// Next.js 16 renomeou `middleware` para `proxy`.
export default withAuth({});

export const config = {
    matcher: ['/dashboard', '/configuracoes', '/movimentacoes', '/orcamento'],
};
