import React from 'react'
import { DatePicker, Divider, ContentCard } from '@/components/index'
import { Button } from "@/components/ui/button"

type Props = {}

export default function page({ }: Props) {
  return (
    <main className='w-screen h-screen background'>
      <h1 className='text-lg font-bold text-secondary mt-12'>Register Reminder</h1>
      <div className='w-full h-full mt-16 flex flex-col gap-8'>
        <div>
          <DatePicker label='Filtrar lembretes pela data' placeholder='selecione uma data' />
          <Button size={'sm'} className='bg-secondary text-secondary-foreground'>Adicionar novo lembrete</Button>
          <Divider />
        </div>
        <div className='flex flex-col gap-4'>
          <ContentCard />
        </div>
      </div>
    </main>
  )
}