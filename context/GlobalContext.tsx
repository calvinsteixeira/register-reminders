'use client'

import React from 'react'

const GlobalContext = React.createContext<SharedComponentsData | undefined>(undefined);

type SharedComponentsData = {
  dateReminderFilter?: Date
}

type Props = {
  children: React.ReactNode,
  sharedComponentsData?: SharedComponentsData
}

export default function GlobalProvider({ children, sharedComponentsData }: Props) {
  const [sharedData, setSharedData] = React.useState<SharedComponentsData | undefined>(sharedComponentsData)

  return (
    <GlobalContext.Provider value={sharedData}>{children}</GlobalContext.Provider>
  )
}


