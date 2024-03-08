import React from 'react'
import { Loader2 } from 'lucide-react'

type Props = {
  show: boolean
  label?: string
}

export default function LoaderScreen({ show, label }: Props) {
  return (
    <div className={`z-10 absolute gap-4 ${show ? 'flex flex-row' : 'hidden'}  w-screen h-screen bg-black opacity-35 items-center justify-center m-0 p-0`}>     
      <p className='text-white'>{label || 'Carregando'}...</p>
      <Loader2 color='white' className="h-5 w-5 animate-spin" />
    </div>
  )
}