import { Card, CardContent, CardHeader } from '@/shared/ui/card';

type CardContasProps = {
    className?: string;
};

export function CardContas({ className }: CardContasProps) {
    return (
        <Card title="Contas" className={className}>
            <CardHeader>
                <h1>Contas</h1>
            </CardHeader>
            <CardContent>
                <p>Banco do brasil</p>
                <p>Itaú</p>
                <p>Nubank</p>
                <p>Caixa</p>
            </CardContent>
        </Card>
    );
}
