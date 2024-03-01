import React from 'react'
import { SelectDateReminder } from '@/components/index'

type Props = {}

export default function page({ }: Props) {
  return (
    <main className='w-screen h-screen background'>
      <h1 className='text-lg font-bold text-secondary mt-12'>Register Reminder</h1>
      <div className='w-full h-full mt-20'>
        <SelectDateReminder />
      </div>
    </main>
  )
}