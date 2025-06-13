import { Skeleton } from '@/shared/ui/skeleton';

export function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-6 pt-4 md:px-8 lg:grid-cols-10 xl:grid-cols-12">
            <div className="col-span-12 flex items-center lg:col-span-10 xl:col-start-2">
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="col-span-12 flex flex-col gap-2 lg:col-span-10 lg:row-start-2 xl:col-start-2">
                <Skeleton className="h-20 overflow-hidden rounded-lg border bg-card shadow-sm" />
            </div>
            <Skeleton className="col-span-12 row-span-1 h-20 gap-2 lg:col-span-5 lg:row-start-3 xl:col-span-4 xl:col-start-2" />
            <Skeleton className="col-span-12 h-40 lg:col-span-4 lg:row-start-4 xl:col-start-2" />
            <Skeleton className="col-span-12 lg:col-span-6 lg:row-span-2 lg:row-start-3" />
        </div>
    );
}
