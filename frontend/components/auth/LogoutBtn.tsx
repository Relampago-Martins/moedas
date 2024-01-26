'use client';
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LogoutBtn() {

    const onClick = () => {
        signOut({ callbackUrl: '/' });
    }

    return (
        <Link className="flex justify-center w-full" href="#" onClick={onClick}>
            Sair
        </Link>
    )
}
        