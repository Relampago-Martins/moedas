'use client';
import { CardTransacao } from '@/features/card-balanco/ui/CardTransacao';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { BsGraphDown, BsGraphUp } from 'react-icons/bs';
import { FaChartSimple } from "react-icons/fa6";
import { Grafico } from './Grafico';

export function CardBalanco() {
  return (
    <Card className="flex-grow">
        <CardHeader className='flex flex-row items-center font-semibold opacity-70'>
            <FaChartSimple className="text-lg mr-2"/>
            Balanço Mensal
        </CardHeader>
        <CardContent className='flex flex-row gap-2'>
            <Grafico />
            <div className="flex flex-col px-2">
                <CardTransacao className='text-green-700'>
                    <BsGraphUp/>
                    <div>R$ 10.000,00</div>
                </CardTransacao>
                <CardTransacao className="text-red-700">
                    <BsGraphDown/>
                    <div>R$ 16.000,00</div>
                </CardTransacao>
                <Separator />
                <CardTransacao className='opacity-70'>
                    <div>Saldo</div>
                    <div> - R$ 6.000,00</div>
                </CardTransacao>
            </div>
        </CardContent>
    </Card>
  );
}