'use client';
import { Stepper, StepperContent } from '@/entities/stepper/ui/stepper';
import { StepFormReceita } from '@/features/modal-novo/ui/steps/step-form-receita';
import { StepListaCategorias } from '@/features/modal-novo/ui/steps/step-lista-categorias';
import { deleteReceita, getReceita } from '@/shared/api/endpoints/receita-cli';
import { useEvent } from '@/shared/lib/use-event';
import { Receita, ReceitaSchema } from '@/types/models/receita';
import { useEffect, useState } from 'react';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { ExcluirMovimentacao } from '../excluir-movimentacao';
import { StepReceitaDetail } from './receita-detail';

type ReceitaContentProps = {
    id: number;
};

export function ReceitaContent({ id }: ReceitaContentProps) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const event = useEvent();

    const [receita, setReceita] = useState<Receita>();
    useEffect(() => {
        getReceita(id).then((receita) => {
            setReceita(receita);
        });
    }, [id]);

    return (
        <Stepper defaultValue={{ name: 'detail', level: 0 }}>
            <StepReceitaDetail receita={receita} />
            <StepFormReceita
                step={{ name: 'editar', level: 1 }}
                formValues={
                    {
                        ...receita,
                        valor: Number(receita?.valor),
                    } as ReceitaSchema
                }
                onSucess={() =>
                    getReceita(id).then((receita) => {
                        setReceita(receita);
                    })
                }
            />
            <StepperContent value="excluir" level={1}>
                <ExcluirMovimentacao
                    tipoMovimentacao={'receita'}
                    id={id}
                    ondDelete={() => {
                        deleteReceita(id);
                        setMovimentacaoSelecionada(undefined);
                    }}
                    stepBack={{ name: 'detail', level: 0 }}
                />
            </StepperContent>
            <StepperContent
                value="lista-categorias-receita"
                level={2}
                className="md:w-[25rem]"
            >
                <StepListaCategorias tipoCategoria="R" />
            </StepperContent>
        </Stepper>
    );
}
