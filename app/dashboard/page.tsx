import React from 'react'
import { DatePicker } from '@/components/index'

type Props = {}

export default function page({ }: Props) {
  return (
    <main className='w-screen h-screen background'>
      <h1 className='text-lg font-bold text-secondary mt-12'>Register Reminder</h1>
      <div className='w-full h-full mt-16'>
        <DatePicker label='Filtrar lembretes pela data' placeholder='selecione uma data'/>
      </div>
    </main>
  )
}