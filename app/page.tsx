'use client'

import React from "react"
import { AnimatedWrapper } from "@/components/index"
import { useRouter } from 'next/navigation'

type Props = {}

export default function Home() {

  const router = useRouter()

  // React.useEffect(() => {
  //   setTimeout(() => { router.replace('/dashboard') }, 2000)
  // }, [])

  return (
    <main className='w-screen h-screen bg-secondary flex items-center justify-center'>
      <AnimatedWrapper
        animationType="attentionSeeker"
        attentionSeekerProps={{
          delay: 200,
          className: "flex",
          effect: "tada",
          triggerOnce: true
        }}
      >
        <div className='flex flex-col gap-1 items-center justify-center'>
          <h1 className='font-bold text-2xl text-secondary-foreground'>Register</h1>
          <span className='font-bold text-2xl text-secondary-foreground'>Reminder</span>
        </div>
      </AnimatedWrapper>
    </main>
  )
}