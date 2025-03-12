'use client';

import { MonthPicker } from '@/entities/movimentacoes/filtros/ui/fields/month-picker';
import { Form } from '@/shared/ui/form';
import { TFiltroPeriodo } from '@/types/filters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function FiltroPeriodo() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const form = useForm<TFiltroPeriodo>({
        defaultValues: {
            periodo_after: searchParams.get('periodo_after') || '',
            periodo_before: searchParams.get('periodo_before') || '',
        },
    });

    const handleSubmit = (data: TFiltroPeriodo) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <MonthPicker formControl={form.control} />
            </form>
        </Form>
    );
}
