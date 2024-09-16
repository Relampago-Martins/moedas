import { receita } from "@/shared/lib/forms";
import * as z from "zod";

export type ReceitaSchema = z.infer<typeof receita>;
export type Receita = Omit<Movimentacao, 'tipo'> & {
} 