import { Skeleton } from '@/shared/ui/skeleton';
import { motion } from 'framer-motion';
import { CalendarIcon, CreditCardIcon } from 'lucide-react';

export function DespesaSkeleton() {
    return (
        <motion.div
            key="despesa-skeleton"
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="flex flex-col gap-4"
        >
            <div className="mb-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-3 w-14" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 animate-pulse text-muted-foreground" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-2 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CreditCardIcon className="h-6 w-6 animate-pulse text-muted-foreground" />
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-2 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <div className="mt-2 flex items-center justify-end gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
            </div>
        </motion.div>
    );
}
