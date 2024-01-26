import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutBtn from "./auth/LogoutBtn";
import ThemeToggle from "./themeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";


export async function UserBox(){
    const session = await getServerSession(authConfig);
    const siglaNome = session?.user?.name?.split(' ').map((n: string) => n[0]).join('') || undefined;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-input rounded-full">
                <Avatar>
                    <AvatarImage src={session?.user?.image || undefined}/>
                    <AvatarFallback>{siglaNome}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex justify-center">
                    {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <LogoutBtn/>
                </DropdownMenuItem>
                <DropdownMenuItem className="justify-center">
                    <ThemeToggle/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
