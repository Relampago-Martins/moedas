'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { Transition } from 'motion/react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import type * as React from 'react';
import { createContext, use } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/utils';

/**
 * A inércia de toda expansão cartão → modal. Fica aqui, e não em cada
 * chamador, para os morphs da aplicação inteira terem o mesmo peso.
 */
export const EXPANSION_TRANSITION: Transition = {
    type: 'spring',
    stiffness: 380,
    damping: 34,
};

/**
 * Raio do cartão fechado e do modal aberto. Em pixels, e não na classe
 * `rounded-lg`, porque o Motion precisa do número para contra-escalar as quinas
 * durante o morph. Acompanha o `--radius-lg` do tema (0.5rem).
 */
const DEFAULT_RADIUS = 8;

interface ExpandableDialogContextValue {
    /** Base dos `layoutId`. Precisa ser único entre os itens da mesma tela. */
    id: string;
    radius: number;
    open: boolean;
}

const ExpandableDialogContext =
    createContext<ExpandableDialogContextValue | null>(null);

function useExpandableDialog(component: string) {
    const context = use(ExpandableDialogContext);

    if (!context) {
        throw new Error(
            `<${component}> precisa estar dentro de um <ExpandableDialog>.`,
        );
    }

    return context;
}

/**
 * O `layoutDependency` das peças do gatilho: com o modal aberto, elas só se
 * medem de novo quando ele fechar.
 *
 * Sem dependência, o Motion mede o elemento a cada render. Um render do gatilho
 * com o modal aberto (uma mutation, um refetch, um `router.refresh()`) vira uma
 * animação de layout do gatilho, que sai da caixa do modal de volta para o
 * lugar dele, visível por baixo do modal aberto. Fechado, a dependência fica
 * indefinida e tudo continua medido a cada render.
 */
export function triggerLayoutDependency(open: boolean) {
    return open ? true : undefined;
}

/**
 * O `layoutDependency` das peças de dentro do modal. Precisa ser diferente do
 * `true` das peças do gatilho aberto: o Motion só faz o morph entre dois
 * elementos com o mesmo `layoutId` quando as dependências deles diferem, e com
 * as duas em `true` o modal aparecia pronto, sem sair do gatilho.
 *
 * Fixo enquanto o modal existe, então o conteúdo só se mede ao montar: os
 * passos do Stepper mudam a altura por conta própria e não viram um morph da
 * caixa inteira.
 */
const CONTENT_LAYOUT_DEPENDENCY = 'expandable-dialog-content';

/** Se a peça está dentro do modal ou no gatilho. */
const InsideContentContext = createContext(false);

function usePieceLayoutDependency(open: boolean) {
    const insideContent = use(InsideContentContext);
    return insideContent
        ? CONTENT_LAYOUT_DEPENDENCY
        : triggerLayoutDependency(open);
}

/** Nomes derivados do `id`, para gatilho e conteúdo não poderem divergir. */
function layoutIds(id: string) {
    return {
        box: `expandable-dialog-${id}`,
        icon: `expandable-dialog-${id}-icon`,
        label: `expandable-dialog-${id}-label`,
    };
}

/**
 * O `layoutId` da caixa, para quando o gatilho não pode ser um
 * `ExpandableDialogTrigger` (um item de lista que abre um modal único da tela,
 * por exemplo). O elemento que recebe esse `layoutId` vira a origem do morph.
 */
export function expandableDialogLayoutId(id: string) {
    return layoutIds(id).box;
}

interface RootProps extends Omit<
    React.ComponentProps<typeof DialogPrimitive.Root>,
    'open' | 'onOpenChange'
> {
    /**
     * Único entre os itens da mesma tela: é dele que saem os `layoutId` que
     * ligam o gatilho ao modal. Em uma lista, use algo do próprio item.
     */
    id: string;
    /** Raio do cartão fechado e do modal, em pixels. */
    radius?: number;
    /**
     * A abertura é sempre controlada: o `AnimatePresence` precisa saber quando
     * o modal saiu para poder animá-lo de volta ao cartão.
     */
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Diálogo que nasce do item que o abriu: o cartão (ou a linha) cresce até virar
 * o modal e encolhe de volta para o mesmo lugar ao fechar.
 *
 * Use quando o modal é a continuação de algo já visível na tela. Sem gatilho,
 * passe `initial`/`animate`/`exit` no `ExpandableDialogContent` para ele entrar
 * por conta própria.
 */
function ExpandableDialog({
    id,
    radius = DEFAULT_RADIUS,
    open,
    children,
    ...props
}: RootProps) {
    return (
        <ExpandableDialogContext value={{ id, radius, open }}>
            {/* Com `prefers-reduced-motion` o Motion descarta as animações de
                transform e o modal simplesmente aparece. */}
            <MotionConfig
                reducedMotion="user"
                transition={EXPANSION_TRANSITION}
            >
                <DialogPrimitive.Root
                    data-slot="expandable-dialog"
                    open={open}
                    {...props}
                >
                    {children}
                </DialogPrimitive.Root>
            </MotionConfig>
        </ExpandableDialogContext>
    );
}

/**
 * O item de onde o modal sai. É um botão de verdade e não recebe estilo nenhum
 * de fábrica: quem chama desenha o cartão, a linha ou o atalho.
 */
function ExpandableDialogTrigger({
    className,
    style,
    ...props
}: React.ComponentProps<typeof motion.button>) {
    const { id, radius, open } = useExpandableDialog('ExpandableDialogTrigger');

    return (
        <DialogPrimitive.Trigger asChild>
            <motion.button
                data-slot="expandable-dialog-trigger"
                type="button"
                layoutId={layoutIds(id).box}
                layoutDependency={triggerLayoutDependency(open)}
                // O raio vai em `style` para o Motion contra-escalá-lo durante
                // o morph; em classe, as quinas achatam no meio do caminho.
                style={{ borderRadius: radius, ...style }}
                className={cn('cursor-pointer', className)}
                {...props}
            />
        </DialogPrimitive.Trigger>
    );
}

/**
 * O selo (normalmente um ícone) que o gatilho e o modal têm em comum. É o que
 * dá a leitura de "o mesmo elemento cresceu".
 */
function ExpandableDialogIcon({
    className,
    ...props
}: React.ComponentProps<typeof motion.span>) {
    const { id, open } = useExpandableDialog('ExpandableDialogIcon');
    const layoutDependency = usePieceLayoutDependency(open);

    return (
        <motion.span
            data-slot="expandable-dialog-icon"
            layoutId={layoutIds(id).icon}
            layoutDependency={layoutDependency}
            className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary',
                className,
            )}
            {...props}
        />
    );
}

/**
 * O rótulo compartilhado. No gatilho é o texto do cartão; dentro do modal ele é
 * o `ExpandableDialogTitle`, então ele viaja em vez de trocar.
 */
function ExpandableDialogLabel({
    className,
    ...props
}: React.ComponentProps<typeof motion.span>) {
    const { id, open } = useExpandableDialog('ExpandableDialogLabel');
    const layoutDependency = usePieceLayoutDependency(open);

    return (
        <motion.span
            data-slot="expandable-dialog-label"
            layoutId={layoutIds(id).label}
            layoutDependency={layoutDependency}
            className={cn('text-sm font-medium', className)}
            {...props}
        />
    );
}

/**
 * Conteúdo do gatilho que não viaja para o modal.
 *
 * Filho comum de um elemento com `layoutId` é escalado junto com a caixa, e
 * texto escalado estica. O `layout` faz o Motion contra-escalar o conteúdo, e
 * ele some logo no começo da abertura, voltando só quando a caixa já está quase
 * de volta ao gatilho.
 */
function ExpandableDialogTriggerText({
    className,
    ...props
}: React.ComponentProps<typeof motion.span>) {
    const { open } = useExpandableDialog('ExpandableDialogTriggerText');

    return (
        <motion.span
            data-slot="expandable-dialog-trigger-text"
            layout
            layoutDependency={triggerLayoutDependency(open)}
            initial={false}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{
                ...EXPANSION_TRANSITION,
                opacity: open
                    ? { duration: 0.08 }
                    : { duration: 0.15, delay: 0.2 },
            }}
            className={cn('text-sm font-medium', className)}
            {...props}
        />
    );
}

/**
 * Portal síncrono para o `body`.
 *
 * O `Portal` do Radix só monta o filho no render seguinte (espera um
 * `useLayoutEffect`), e o Motion já terminou de medir o gatilho quando o modal
 * aparece: a abertura vira um modal surgindo, não o botão crescendo. Aqui o
 * modal entra no mesmo commit do clique. Só é montado com o modal aberto, então
 * sempre roda no cliente.
 */
function BodyPortal({ children }: { children: React.ReactNode }) {
    return createPortal(children, document.body);
}

/**
 * A origem do morph para quando o gatilho não é um `ExpandableDialogTrigger`
 * (um botão que abre um modal único da tela por uma store). Cobre o pai, que
 * precisa ser `relative`.
 *
 * Fechada, é invisível. Com o modal aberto ela fica com a cara da caixa: na
 * volta o Motion faz um crossfade entre o modal e a origem, e uma origem
 * transparente faria o modal sumir no meio do caminho. Ela só desaparece depois
 * de pousar no botão.
 */
function ExpandableDialogOrigin({
    id,
    open,
    radius = DEFAULT_RADIUS,
    className,
    style,
    ...props
}: React.ComponentProps<typeof motion.span> & {
    /** O mesmo `id` do `ExpandableDialog` que sai daqui. */
    id: string;
    /** Se o modal que sai daqui está aberto. */
    open: boolean;
    radius?: number;
}) {
    return (
        <motion.span
            aria-hidden
            data-slot="expandable-dialog-origin"
            layoutId={layoutIds(id).box}
            // Fica fora do `MotionConfig` do diálogo, e é a origem que conduz
            // a volta: sem a mola explícita, o fechamento usaria a transição
            // de quem estiver em volta e acabaria no meio do caminho.
            transition={{
                ...EXPANSION_TRANSITION,
                opacity: open
                    ? { duration: 0 }
                    : { duration: 0.15, delay: 0.3 },
            }}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            layoutDependency={triggerLayoutDependency(open)}
            style={{ borderRadius: radius, ...style }}
            className={cn(
                'pointer-events-none absolute inset-0 border bg-popover',
                className,
            )}
            {...props}
        />
    );
}

type ExpandableDialogContentProps = Omit<
    React.ComponentProps<typeof motion.div>,
    'children'
> & {
    // O `children` do `motion.div` aceita `MotionValue`; aqui ele convive com o
    // botão de fechar em um fragmento, então precisa ser `ReactNode`.
    children?: React.ReactNode;
    showCloseButton?: boolean;
};

/**
 * O modal em que o gatilho se transforma.
 *
 * Não reaproveita o `DialogContent`: aquele centraliza por `translate` e anima
 * com `data-[state]:zoom-in`, e as duas coisas disputam o `transform` com a
 * projeção do Motion. Aqui a centralização é do grid de fora e o `transform` é
 * só do Motion.
 */
function ExpandableDialogContent({
    className,
    style,
    children,
    showCloseButton = true,
    ...props
}: ExpandableDialogContentProps) {
    const { id, radius, open } = useExpandableDialog('ExpandableDialogContent');

    return (
        // Quem monta e desmonta é o `AnimatePresence`, não o Radix: daí o
        // `forceMount` no conteúdo. Sem isso o Radix arrancaria o modal da
        // árvore no clique, antes de ele ter voltado para o cartão.
        <AnimatePresence>
            {open && (
                <BodyPortal key="expandable-dialog-layer">
                    <motion.div
                        data-slot="expandable-dialog-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs"
                    />

                    {/* A camada de centralização não captura clique: o que
                        estiver fora do modal continua chegando ao overlay. */}
                    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center p-4">
                        <DialogPrimitive.Content asChild forceMount>
                            <motion.div
                                data-slot="expandable-dialog-content"
                                layoutId={layoutIds(id).box}
                                layoutDependency={CONTENT_LAYOUT_DEPENDENCY}
                                style={{ borderRadius: radius, ...style }}
                                className={cn(
                                    'pointer-events-auto relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col gap-4 overflow-y-auto border bg-popover p-6 outline-none',
                                    className,
                                )}
                                {...props}
                            >
                                <InsideContentContext value>
                                    {children}
                                </InsideContentContext>

                                {showCloseButton && (
                                    <DialogPrimitive.Close
                                        data-slot="expandable-dialog-close"
                                        className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
                                    >
                                        <X className="size-4" />
                                        <span className="sr-only">Fechar</span>
                                    </DialogPrimitive.Close>
                                )}
                            </motion.div>
                        </DialogPrimitive.Content>
                    </div>
                </BodyPortal>
            )}
        </AnimatePresence>
    );
}

function ExpandableDialogHeader({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="expandable-dialog-header"
            className={cn('flex shrink-0 flex-col gap-2 text-left', className)}
            {...props}
        />
    );
}

/** O título acessível do modal, sobre o rótulo que veio do gatilho. */
function ExpandableDialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof motion.span>) {
    return (
        <DialogPrimitive.Title asChild>
            <ExpandableDialogLabel
                className={cn('text-lg font-semibold', className)}
                {...props}
            />
        </DialogPrimitive.Title>
    );
}

/**
 * A descrição não compartilha `layoutId`: só existe aberta, então entra em
 * opacidade. Esticar texto no morph custa caro e fica borrado.
 */
function ExpandableDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof motion.p>) {
    return (
        <DialogPrimitive.Description asChild>
            <motion.p
                data-slot="expandable-dialog-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn('text-sm text-muted-foreground', className)}
                {...props}
            />
        </DialogPrimitive.Description>
    );
}

/**
 * O miolo do modal, o que não existe no estado fechado. Entra em opacidade com
 * um atraso curto, para a caixa já estar quase no tamanho final.
 */
function ExpandableDialogBody({
    className,
    ...props
}: React.ComponentProps<typeof motion.div>) {
    return (
        <motion.div
            data-slot="expandable-dialog-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className={cn('flex min-h-0 flex-col gap-4', className)}
            {...props}
        />
    );
}

function ExpandableDialogFooter({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="expandable-dialog-footer"
            className={cn(
                'flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                className,
            )}
            {...props}
        />
    );
}

const ExpandableDialogClose = DialogPrimitive.Close;

export {
    ExpandableDialog,
    ExpandableDialogBody,
    ExpandableDialogClose,
    ExpandableDialogContent,
    ExpandableDialogDescription,
    ExpandableDialogFooter,
    ExpandableDialogHeader,
    ExpandableDialogIcon,
    ExpandableDialogLabel,
    ExpandableDialogOrigin,
    ExpandableDialogTitle,
    ExpandableDialogTrigger,
    ExpandableDialogTriggerText,
};
