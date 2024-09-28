'use client';
import { FormDespesa } from '@/features/modal-novo/ui/steps/form-despesa';
import { deleteDespesa } from '@/shared/api/endpoints/despesa-cli';
import { Button } from '@/shared/ui/button';
import { SliderAnimation } from '@/shared/ui/custom/slider-animation';
import { Despesa, DespesaSchema } from '@/types/models/despesa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { DespesaDetail } from './despesa-detail';

type DespesaContentProps = {
    id: number;
};

export function DespesaContent({ id }: DespesaContentProps) {
    const router = useRouter();
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [step, setStep] = useState('detail');
    const [formValues, setFormValues] = useState<Despesa>();

    return (
        <SliderAnimation step={step} firstStep="detail">
            {step === 'detail' && (
                <DespesaDetail
                    id={id}
                    onEdit={(despesa) => {
                        setStep('editar');
                        setFormValues(despesa);
                    }}
                    onDelete={() => setStep('excluir')}
                />
            )}
            {step === 'editar' && (
                <>
                    <button onClick={() => setStep('detail')}>voltar</button>
                    <FormDespesa
                        onSucess={() => {
                            setMovimentacaoSelecionada(undefined);
                            router.refresh();
                        }}
                        formValues={
                            {
                                ...formValues,
                                forma_pagamento:
                                    formValues?.forma_pagamento.sigla,
                                categoria: formValues?.categoria.sigla,
                                valor: Number(formValues?.valor.toString()),
                            } as DespesaSchema
                        }
                    />
                </>
            )}
            {step === 'excluir' && (
                <div>
                    <h1></h1>
                    <h3 className="text-xl font-semibold">
                        Deseja realmente excluir essa despesa?
                    </h3>
                    <div className="flex gap-2">
                        <Button
                            variant={'destructive'}
                            onClick={() =>
                                deleteDespesa(id).then(() => {
                                    setMovimentacaoSelecionada(undefined);
                                    router.refresh();
                                })
                            }
                            className="btn btn-danger"
                        >
                            Excluir
                        </Button>
                        <Button
                            onClick={() => setStep('detail')}
                            variant={'outline'}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            )}
        </SliderAnimation>
    );
}
