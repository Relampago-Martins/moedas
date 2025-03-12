import { categoria } from "@/shared/lib/forms";
import * as z from "zod";

export type Categoria = Omit<z.infer<typeof categoria>, 'tipo'> & {
    tipo: "D" | "R";
};