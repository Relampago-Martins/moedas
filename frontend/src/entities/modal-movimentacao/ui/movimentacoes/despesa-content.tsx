'use client';
import { StepHeader } from '@/features/modal-novo/ui/step-header';
import { FormDespesa } from '@/features/modal-novo/ui/steps/form-despesa';
import { deleteDespesa, getDespesa } from '@/shared/api/endpoints/despesa-cli';
import { SliderAnimation } from '@/shared/ui/custom/slider-animation';
import { Despesa, DespesaSchema } from '@/types/models/despesa';
import { useCallback, useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { ExcluirMovimentacao } from '../excluir-movimentacao';
import { DespesaDetail } from './despesa-detail';

type DespesaContentProps = {
    id: number;
};

export function DespesaContent({ id }: DespesaContentProps) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [step, setStep] = useState('detail');
    const [despesa, setDespesa] = useState<Despesa>();

    const getSetDespesa = useCallback(async (id: number) => {
        return await getDespesa(id).then((despesa) => {
            setDespesa(despesa);
        });
    }, []);
    useEffect(() => {
        getSetDespesa(id);
    }, [id]);

    return (
        <SliderAnimation step={step} firstStep="detail">
            {step === 'detail' && (
                <DespesaDetail
                    despesa={despesa}
                    onEdit={() => setStep('editar')}
                    onDelete={() => setStep('excluir')}
                />
            )}
            {step === 'editar' && (
                <>
                    <StepHeader
                        title="Editar despesa"
                        onBack={() => setStep('detail')}
                    />
                    <FormDespesa
                        onSucess={() => {
                            setStep('detail');
                            getSetDespesa(id);
                        }}
                        formValues={
                            {
                                ...despesa,
                                forma_pagamento: despesa?.forma_pagamento.sigla,
                                categoria: despesa?.categoria.sigla,
                                valor: Number(despesa?.valor.toString()),
                            } as DespesaSchema
                        }
                    />
                </>
            )}
            {step === 'excluir' && (
                <ExcluirMovimentacao
                    tipoMovimentacao={'despesa'}
                    id={id}
                    ondDelete={() => {
                        deleteDespesa(id);
                        setMovimentacaoSelecionada(undefined);
                    }}
                    onCancelar={() => setStep('detail')}
                />
            )}
        </SliderAnimation>
    );
}
