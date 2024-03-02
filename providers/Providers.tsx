'use client'

import React from 'react'
import GlobalProvider from '@/context/GlobalContext'

type Props = {
  children: React.ReactNode
}

export default function Providers({children}: Props) {
  return (
    <GlobalProvider>{children}</GlobalProvider>
  )
}