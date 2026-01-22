import { Banco } from '@/types/models/banco';
import Image from 'next/image';

type AvatarBancoProps = {
    banco: Banco;
    width?: number;
    height?: number;
};
export function AvatarBanco({
    banco,
    width = 32,
    height = 32,
}: AvatarBancoProps) {
    return (
        <div
            className="flex shrink-0 items-center justify-center rounded-full  font-semibold text-primary-foreground"
            style={{ width, height }}
        >
            {banco.foto ? (
                <Image
                    src={banco.foto}
                    alt={banco.nome}
                    width={width}
                    height={height}
                    className="h-full w-full rounded-full"
                />
            ) : (
                <span className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-bold ">
                    {banco.abreviacao.slice(0, 2).toUpperCase()}
                </span>
            )}
        </div>
    );
}
