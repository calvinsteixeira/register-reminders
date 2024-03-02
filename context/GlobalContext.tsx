'use client'

import React from 'react'

type GlobalContextType = {
  data: null | { dateReminderFilter?: Date | null },
  setData: React.Dispatch<React.SetStateAction<null | { dateReminderFilter?: Date }>>
}

const defaultContextValues: GlobalContextType  = {
  data: { dateReminderFilter: null },
  setData: () => {}
}

type Children = {
  children: React.ReactNode
}

export const GlobalContext = React.createContext<GlobalContextType>(defaultContextValues)

export default function GlobalProvider({ children }: Children) {
  const [data, setData] = React.useState<null | { dateReminderFilter?: Date }>(null)

  const sharedData = {
    data,
    setData
  }

  return (
    <GlobalContext.Provider value={sharedData}>{children}</GlobalContext.Provider>
  )
}