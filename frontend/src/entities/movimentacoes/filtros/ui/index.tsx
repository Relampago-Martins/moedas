'use client';
import { Form } from '@/shared/ui/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SearchMovimentacoes } from '../lib/types';
import { MonthPicker } from './fields/month-picker';

export function Filtros() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const form = useForm<SearchMovimentacoes>({
        defaultValues: {
            periodo_after: searchParams.get('periodo_after') || '',
            periodo_before: searchParams.get('periodo_before') || '',
        },
        mode: 'onChange',
    });

    const handleSubmit = (data: SearchMovimentacoes) => {
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
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-4 ">
                <MonthPicker formControl={form.control} />
            </form>
        </Form>
    );
}
