import React from 'react'
import { DatePicker, Divider } from '@/components/index'
import { Button } from "@/components/ui/button"

type Props = {}

export default function page({ }: Props) {
  return (
    <main className='w-screen h-screen background'>
      <h1 className='text-lg font-bold text-secondary mt-12'>Register Reminder</h1>
      <div className='w-full h-full mt-16'>
        <DatePicker label='Filtrar lembretes pela data' placeholder='selecione uma data'/>
        <Button size={'sm'} className='bg-secondary text-secondary-foreground'>Adicionar novo lembrete</Button>
        <Divider/>
      </div>
    </main>
  )
}