import { cn } from '@/shared/lib/utils';

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-border shadow-sm',
                className,
            )}
            {...props}
        />
    );
}

export { Skeleton };
