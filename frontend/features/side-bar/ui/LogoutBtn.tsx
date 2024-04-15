'use client';
import { signOut } from "next-auth/react";

export default function LogoutBtn() {

    const onClick = () => {
        signOut({ callbackUrl: '/' });
    }

    return (
        <button className="flex w-full"
            onClick={onClick}>
            Sair
        </button>
    )
}
        