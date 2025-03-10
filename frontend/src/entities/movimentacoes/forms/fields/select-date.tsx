import { useStepper } from '@/entities/stepper/ui/stepper';
import { ModalNovoSteps } from '@/features/modal-novo/ui';
import { toLocalDate } from '@/shared/lib/utils';
import { DespesaSchema } from '@/types/models/despesa';
import { ControllerRenderProps } from 'react-hook-form';

type DateInputProps = ControllerRenderProps<DespesaSchema, 'data'>;

export function SelectDate(props: DateInputProps) {
    const { goToStep } = useStepper<ModalNovoSteps>();
    return (
        <button
            type="button"
            value={props.value}
            className="relative flex h-9 items-center rounded-md border"
            onClick={() =>
                goToStep({
                    name: 'calendario',
                    level: 2,
                })
            }
        >
            {props.value ? (
                <span className="ml-3">{toLocalDate(props.value)}</span>
            ) : (
                <span className="ml-3">Selecione</span>
            )}
            <i className="ph ph-calendar absolute right-3 text-xl"></i>
            <input {...props} type="hidden" />
        </button>
    );
}
