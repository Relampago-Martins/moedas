import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';

export function ItemMovimentacaoSkeleton() {
    return (
        <div className="flex h-16 w-full items-center gap-3 overflow-hidden rounded-md border-[1px] bg-card">
            <div className="flex h-16 w-14 shrink-0 items-center justify-center">
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="flex w-full flex-col gap-2">
                <div className="flex flex-row items-center justify-between gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-40" />
                    <Separator orientation="vertical" className="h-4" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <div className="pr-4"></div>
        </div>
    );
}
