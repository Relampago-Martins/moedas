// EventContext.tsx
import { Categoria } from '@/types/models/categoria';
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';

// Definindo os eventos disponíveis e seus tipos de dados correspondentes
export interface EventMap {
    onSelectCategoria: Categoria;
}

// Tipo para o callback de um evento
type EventCallback<T> = (data: T) => void;

// Interface para o contexto do evento
interface EventContextType {
    subscribe: <K extends keyof EventMap>(
        eventName: K,
        callback: EventCallback<EventMap[K]>,
    ) => () => void;
    submit: <K extends keyof EventMap>(
        eventName: K,
        data: EventMap[K],
    ) => number;
}

// Props para o EventProvider
interface EventProviderProps {
    children?: ReactNode;
}

// Criando o contexto para os eventos
const EventContext = createContext<EventContextType | null>(null);

// Provider de eventos que gerencia as assinaturas e submissões
export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
    // Estado para armazenar os assinantes dos eventos tipados
    const [eventSubscribers, setEventSubscribers] = useState<{
        [K in keyof EventMap]?: EventCallback<EventMap[K]>[];
    }>({});

    // Função para assinar um evento (tipada)
    const subscribe = useCallback(
        <K extends keyof EventMap>(
            eventName: K,
            callback: EventCallback<EventMap[K]>,
        ) => {
            setEventSubscribers((prev) => {
                // Cria uma nova lista de assinantes para o evento se não existir
                const currentSubscribers = (prev[eventName] ||
                    []) as EventCallback<EventMap[K]>[];

                // Adiciona o novo callback à lista
                return {
                    ...prev,
                    [eventName]: [...currentSubscribers, callback],
                };
            });

            // Retorna uma função para cancelar a assinatura
            return () => {
                setEventSubscribers((prev) => {
                    const currentSubscribers = (prev[eventName] ||
                        []) as EventCallback<EventMap[K]>[];
                    return {
                        ...prev,
                        [eventName]: currentSubscribers.filter(
                            (cb) => cb !== callback,
                        ) as any,
                    };
                });
            };
        },
        [],
    );

    // Função para disparar um evento (tipada)
    const submit = useCallback(
        <K extends keyof EventMap>(eventName: K, data: EventMap[K]) => {
            const subscribers = (eventSubscribers[eventName] ||
                []) as EventCallback<EventMap[K]>[];

            // Notifica todos os assinantes do evento
            subscribers.forEach((callback) => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(
                        `Erro ao processar evento ${String(eventName)}:`,
                        error,
                    );
                }
            });

            return subscribers.length; // Retorna o número de assinantes notificados
        },
        [eventSubscribers],
    );

    // Expõe as funções no contexto
    const value: EventContextType = {
        subscribe,
        submit,
    };

    return (
        <EventContext.Provider value={value}>{children}</EventContext.Provider>
    );
};

// Hook personalizado para usar o sistema de eventos
export const useEvent = (): EventContextType => {
    const context = useContext(EventContext);

    if (!context) {
        throw new Error('useEvent deve ser usado dentro de um EventProvider');
    }

    return context;
};
