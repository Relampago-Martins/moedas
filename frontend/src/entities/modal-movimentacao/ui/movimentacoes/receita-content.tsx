'use client';
import { StepObject } from '@/entities/stepper/lib/types';
import { Stepper, StepperContent } from '@/entities/stepper/ui/stepper';
import { ListaCategorias } from '@/features/modal-novo/ui/steps/lista-categorias';
import { StepFormReceita } from '@/features/modal-novo/ui/steps/step-form-receita';
import { deleteReceita, getReceita } from '@/shared/api/endpoints/receita-cli';
import { useEvent } from '@/shared/ui/custom/use-event';
import { Receita, ReceitaSchema } from '@/types/models/receita';
import { useEffect, useState } from 'react';
import { MovimentacaoSteps } from '../../lib/types';
import { useMovimentacaoContext } from '../../lib/use-movimentacao-context';
import { ExcluirMovimentacao } from '../excluir-movimentacao';
import { ReceitaDetail } from './receita-detail';

type ReceitaContentProps = {
    id: number;
};

export function ReceitaContent({ id }: ReceitaContentProps) {
    const { setMovimentacaoSelecionada } = useMovimentacaoContext();
    const event = useEvent();
    const [step, setStep] = useState<StepObject<MovimentacaoSteps>>({
        name: 'detail',
        level: 0,
    });
    const [receita, setReceita] = useState<Receita>();
    useEffect(() => {
        getReceita(id).then((receita) => {
            setReceita(receita);
        });
    }, [id]);

    return (
        <Stepper currentStep={step} onStepChange={setStep}>
            <StepperContent value="detail" level={0}>
                <ReceitaDetail
                    receita={receita}
                    onEdit={() => setStep({ name: 'editar', level: 1 })}
                    onDelete={() => setStep({ name: 'excluir', level: 1 })}
                />
            </StepperContent>
            <StepFormReceita
                subscribeEvent={event.subscribe}
                step={{ name: 'editar', level: 1 }}
                formValues={
                    {
                        ...receita,
                        categoria: receita?.categoria?.sigla,
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
                <ListaCategorias
                    onSelect={(categoria) => {
                        event.submit('onSelectCategoria', categoria);
                    }}
                    tipoCategoria="R"
                    stepBack={{
                        name: 'editar',
                        level: 1,
                    }}
                />
            </StepperContent>
        </Stepper>
    );
}
