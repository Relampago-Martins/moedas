import * as z from 'zod';
import { gastoForm } from './schema';

export type GastoForm = z.infer<typeof gastoForm> 

export type ModalNovoStore = {
    isOpen: boolean;
    onOpenChange: (newState: boolean) => void;
};
