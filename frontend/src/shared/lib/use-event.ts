// useEvent.ts
import { Categoria } from '@/types/models/categoria';
import { useCallback, useRef } from 'react';

// Definindo os eventos disponíveis e seus tipos de dados correspondentes
export interface EventMap {
    onSelectCategoria: Categoria;
    onSelectDate: Date;
    onOpenDateStep: Date;
}

// Tipo para o callback de um evento
type EventCallback<T> = (data: T) => void;

export const useEvent = () => {
    // Referência mutável para armazenar os assinantes dos eventos
    const subscribersRef = useRef<{
        [K in keyof EventMap]?: EventCallback<EventMap[K]>[];
    }>({});

    // Função para assinar um evento
    const subscribe = useCallback(
        <K extends keyof EventMap>(
            eventName: K,
            callback: EventCallback<EventMap[K]>,
        ) => {
            // Se não existir lista de assinantes para este evento, cria uma
            if (!subscribersRef.current[eventName]) {
                subscribersRef.current[eventName] = [];
            }

            // Adiciona o callback à lista de assinantes
            subscribersRef.current[eventName]!.push(callback);

            // Retorna função para cancelar a assinatura
            // return () => {
            //     subscribersRef.current[eventName] = subscribersRef.current[
            //         eventName
            //     ]!.filter((cb) => cb !== callback);
            // };
        },
        [],
    );

    // Função para disparar um evento
    const submit = useCallback(
        <K extends keyof EventMap>(eventName: K, data: EventMap[K]) => {
            const subscribers = subscribersRef.current[eventName] || [];

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
        [],
    );

    return { subscribe, submit };
};
