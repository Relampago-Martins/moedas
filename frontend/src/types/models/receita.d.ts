import { receita } from "@/shared/lib/forms";
import * as z from "zod";
import { Movimentacao } from "./movimentacao";

export type ReceitaSchema = z.infer<typeof receita>;
export type Receita = Omit<Movimentacao, 'tipo'> & {
} 