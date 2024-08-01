import { Form } from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { gastoForm } from '../lib/schema';
import { GastoForm } from '../lib/types';

export function CadastroGasto() {
    const form = useForm<GastoForm>({
        resolver: zodResolver(gastoForm),
        defaultValues: {
            descricao: '',
            valor: 0,
        },
    });
    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit((val) => console.log(val))}
            >
                <input type="text" {...form.register('descricao')} />
                <input type="number" {...form.register('valor')} />
                <button type="submit">Enviar</button>
            </form>
        </Form>
    );
}
