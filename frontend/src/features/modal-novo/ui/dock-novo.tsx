'use client';
import { useModalNovoStore } from '../lib/modal-novo-store';
import { OPCOES_NOVO } from '../lib/opcoes-novo';
import { ModalNovoOrigin } from './modal-novo-origin';

/** Raio dos botões da dock, em pixels, para o morph botão → modal. */
const RAIO_BOTAO = 12;

/**
 * Atalhos fixos no rodapé para criar uma movimentação. Cada botão abre o modal
 * Novo direto no passo dele, saindo do próprio botão no desktop.
 */
export function DockNovo() {
    const abrir = useModalNovoStore((state) => state.abrir);

    return (
        <nav
            aria-label="Criar movimentação"
            className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border bg-popover/90 p-1.5 shadow-lg backdrop-blur-sm"
        >
            {OPCOES_NOVO.map(({ step, label, Icon, className }) => {
                const origemId = `dock-${step}`;
                return (
                    <button
                        key={step}
                        type="button"
                        title={label}
                        aria-label={`Criar ${label.toLowerCase()}`}
                        onClick={() =>
                            abrir(origemId, { name: step, level: 1 })
                        }
                        style={{ borderRadius: RAIO_BOTAO }}
                        className="relative flex size-12 cursor-pointer items-center justify-center transition-colors hover:bg-accent"
                    >
                        <Icon className={`size-6 ${className}`} />
                        <ModalNovoOrigin id={origemId} radius={RAIO_BOTAO} />
                    </button>
                );
            })}
        </nav>
    );
}
