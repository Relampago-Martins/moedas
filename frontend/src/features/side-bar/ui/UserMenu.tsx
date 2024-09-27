import { authConfig } from '@/shared/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { getServerSession } from 'next-auth';
import ThemeToggle from '../../../components/themeToggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../shared/ui/dropdown-menu';
import LogoutBtn from './LogoutBtn';

export async function UserMenu() {
    const session = await getServerSession(authConfig);
    const siglaNome =
        session?.user?.name
            ?.split(' ')
            .map((n: string) => n[0])
            .join('') || undefined;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border border-muted">
                <Avatar>
                    <AvatarImage src={session?.user?.image || undefined} />
                    <AvatarFallback>{siglaNome}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex justify-center">
                    {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar perfil</DropdownMenuItem>
                <DropdownMenuItem>Notificações</DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutBtn />
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-center">
                    <ThemeToggle />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
