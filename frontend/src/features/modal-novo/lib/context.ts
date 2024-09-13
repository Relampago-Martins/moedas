import { createContext } from "react";
import { StepName } from "./types";

type ModalCadastroContextProps = {
    step: StepName;
    setStep: (step: StepName) => void;
}

export const ModalCadastroContext = createContext<ModalCadastroContextProps>({
    step: 'menu',
    setStep: () => {},
});