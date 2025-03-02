'use client';
import {
    StepObject,
    Stepper,
    StepperContent,
} from '@/features/modal-novo/ui/stepper';
import { FormDespesa } from '@/features/modal-novo/ui/steps/form-despesa';
import { ListaCategorias } from '@/features/modal-novo/ui/steps/lista-categorias';
import { deleteDespesa, getDespesa } from '@/shared/api/endpoints/despesa-cli';
import { Despesa, DespesaSchema } from '@/types/models/despesa';
import { useCallback, useEffect, useState } from 'react';
import { MovimentacaoSteps } from '../../lib/types';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { ExcluirMovimentacao } from '../excluir-movimentacao';
import { DespesaDetail } from './despesa-detail';

type DespesaContentProps = {
    id: number;
};

export function DespesaContent({ id }: DespesaContentProps) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const [step, setStep] = useState<StepObject<MovimentacaoSteps>>({
        name: 'detail',
        level: 0,
    });
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
        <Stepper currentStep={step} onStepChange={setStep}>
            <StepperContent value="detail" level={0}>
                <DespesaDetail
                    despesa={despesa}
                    onEdit={() => setStep({ name: 'editar', level: 1 })}
                    onDelete={() => setStep({ name: 'excluir', level: 1 })}
                />
            </StepperContent>
            <StepperContent value="editar" level={1}>
                <FormDespesa
                    stepBack={{ name: 'detail', level: 0 }}
                    onSucess={() => getSetDespesa(id)}
                    formValues={
                        {
                            ...despesa,
                            forma_pagamento: despesa?.forma_pagamento.sigla,
                            categoria: despesa?.categoria.sigla,
                            valor: Number(despesa?.valor.toString()),
                        } as DespesaSchema
                    }
                />
            </StepperContent>
            <StepperContent value="excluir" level={1}>
                <ExcluirMovimentacao
                    tipoMovimentacao={'despesa'}
                    id={id}
                    ondDelete={() => {
                        deleteDespesa(id);
                        setMovimentacaoSelecionada(undefined);
                    }}
                    stepBack={{ name: 'detail', level: 0 }}
                />
            </StepperContent>
            <StepperContent
                value="lista-categorias"
                level={2}
                className="md:w-[25rem]"
            >
                <ListaCategorias
                    stepBack={{
                        name: 'editar',
                        level: 1,
                    }}
                />
            </StepperContent>
        </Stepper>
    );
}
