import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authConfig } from './shared/lib/auth';
 
export async function middleware(request: NextRequest) {
    const session = await getServerSession(authConfig);
    if (!session) return NextResponse.redirect('/login');
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/app/(user-stuff)', '/app/(user-stuff)/movimentacoes',],
}