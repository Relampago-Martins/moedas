'use client';
import { APIUser } from '@/types/auth';
import { getBoasVindas } from '../lib/saudacao';

type SaudacaoProps = {
    user: APIUser;
};

export function Saudacao({ user }: SaudacaoProps) {
    return (
        <div className="text-xl font-medium opacity-90 ">
            {getBoasVindas()}, {user.first_name || user.username}
        </div>
    );
}
