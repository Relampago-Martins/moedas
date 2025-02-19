'use client';
import { getCurrentUser } from '@/shared/api/endpoints/auth';
import { Skeleton } from '@/shared/ui/skeleton';
import { APIUser } from '@/types/auth';
import { useEffect, useState } from 'react';
import { getBoasVindas } from '../lib/saudacao';

type SaudacaoProps = {};

export function Saudacao({}: SaudacaoProps) {
    const [user, setUser] = useState<APIUser | null>(null);

    useEffect(() => {
        getCurrentUser().then(setUser);
    }, []);

    return !!user ? (
        <div className="text-xl font-medium opacity-90 ">
            {getBoasVindas()}, {user.first_name || user.username}
        </div>
    ) : (
        <Skeleton className="h-6 w-32" />
    );
}
