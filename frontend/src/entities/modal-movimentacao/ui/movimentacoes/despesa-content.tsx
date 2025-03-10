'use client';
import { Stepper, StepperContent } from '@/entities/stepper/ui/stepper';
import { ListaCategorias } from '@/features/modal-novo/ui/steps/lista-categorias';
import { StepFormDespesa } from '@/features/modal-novo/ui/steps/step-form-despesa';
import { StepSelectDate } from '@/features/modal-novo/ui/steps/step-select-date';
import { deleteDespesa, getDespesa } from '@/shared/api/endpoints/despesa-cli';
import { useEvent } from '@/shared/lib/use-event';
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
    const event = useEvent();

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
        <Stepper defaultValue={{ name: 'detail', level: 0 }}>
            <DespesaDetail despesa={despesa} />
            <StepFormDespesa
                step={{ name: 'editar', level: 1 }}
                onSucess={() => getSetDespesa(id)}
                formValues={
                    {
                        ...despesa,
                        forma_pagamento: despesa?.forma_pagamento.sigla,
                        valor: Number(despesa?.valor.toString()),
                    } as DespesaSchema
                }
            />
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
                <ListaCategorias />
            </StepperContent>

            <StepSelectDate />
        </Stepper>
    );
}
