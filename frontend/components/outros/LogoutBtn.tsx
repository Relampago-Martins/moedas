'use client';

import { removeUser } from "@/app/actions";
import Link from "next/link";

export default function LogoutBtn() {
    
    const Logout = () => {
        removeUser();
        window.location.href = '/';
    }

    return (
        <Link className="flex justify-center w-full" href="#" onClick={Logout}>
            Sair
        </Link>
    )
}
        