export { default } from "next-auth/middleware";
 
//refs: https://next-auth.js.org/configuration/nextjs

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/configuracoes', '/movimentacoes', '/plano-financeiro',],
}