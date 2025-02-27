'use client';
import { DialogOrDrawerHeader } from '@/features/modal-novo/ui/step-header';
import { FormReceita } from '@/features/modal-novo/ui/steps/form-receita';
import { deleteReceita, getReceita } from '@/shared/api/endpoints/receita-cli';
import { SliderAnimation } from '@/shared/ui/custom/slider-animation';
import { Receita, ReceitaSchema } from '@/types/models/receita';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { ExcluirMovimentacao } from '../excluir-movimentacao';
import { ReceitaDetail } from './receita-detail';

type ReceitaContentProps = {
    id: number;
};

export function ReceitaContent({ id }: ReceitaContentProps) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [step, setStep] = useState('detail');
    const [receita, setReceita] = useState<Receita>();
    useEffect(() => {
        getReceita(id).then((receita) => {
            setReceita(receita);
        });
    }, [id]);

    return (
        <SliderAnimation step={step} firstStep="detail">
            {step === 'detail' && (
                <ReceitaDetail
                    receita={receita}
                    onEdit={() => setStep('editar')}
                    onDelete={() => setStep('excluir')}
                />
            )}
            {step === 'editar' && (
                <>
                    <DialogOrDrawerHeader
                    // title="Editar receita"
                    // onBack={() => setStep('detail')}
                    />
                    <FormReceita
                        formValues={
                            {
                                ...receita,
                                categoria: receita?.categoria?.sigla,
                                valor: Number(receita?.valor),
                            } as ReceitaSchema
                        }
                        onSucess={() => {
                            setStep('detail');
                            getReceita(id).then((receita) => {
                                setReceita(receita);
                            });
                        }}
                    />
                </>
            )}
            {step === 'excluir' && (
                <ExcluirMovimentacao
                    tipoMovimentacao={'receita'}
                    id={id}
                    ondDelete={() => {
                        deleteReceita(id);
                        setMovimentacaoSelecionada(undefined);
                    }}
                    onCancelar={() => setStep('detail')}
                />
            )}
        </SliderAnimation>
    );
}
