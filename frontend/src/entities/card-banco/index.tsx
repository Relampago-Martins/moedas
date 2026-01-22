'use client';
import { AvatarBanco } from '@/features/conta-bancaria/ui/shared/avatar-banco';
import { Skeleton } from '@/shared/ui/skeleton';
import { Banco } from '@/types/models/banco';

interface CardBancoProps {
    banco: Banco;
    onClick: (banco: Banco) => void;
}

export function CardBanco({ banco, onClick }: CardBancoProps) {
    return (
        <button
            onClick={() => onClick(banco)}
            className="flex w-full items-center gap-4 rounded-xl border bg-muted-foreground px-4 py-2 transition duration-200 hover:scale-[1.02]"
        >
            <AvatarBanco banco={banco} />
            <div className="flex w-full flex-col text-start">
                <span className="text-sm font-medium">{banco.abreviacao}</span>
                <span className="w-[380px] truncate text-nowrap text-sm text-muted">
                    {banco.nome}
                </span>
            </div>
        </button>
    );
}

export function CardBancoSkeleton() {
    return (
        <div className="flex w-full items-center gap-4 rounded-xl border bg-muted-foreground px-4 py-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-80" />
            </div>
        </div>
    );
}
