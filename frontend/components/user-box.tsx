'use client'

import { getUser } from "@/app/actions";
import { User } from "@/types/Auth";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LogoutBtn from "./outros/LogoutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";


export function UserBox(){
    const {theme, setTheme } = useTheme();
    const [usuario, setUsuario] = useState<User>();

    useEffect(() => {
        getUser().then((user) => {
            setUsuario(user);
        });
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-input rounded-full">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>POP</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex justify-center">{usuario?.usuario}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <LogoutBtn/>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={event => event.preventDefault()}>
                    <div className="flex flex-row gap-3 items-center">
                        <SunIcon className="h-4 w-4 transition-all" />
                        <Switch 
                            checked={theme === "dark"}
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
                        />
                        <MoonIcon className="h-4 w-4 transition-all" />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
