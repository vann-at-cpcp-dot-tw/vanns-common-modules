"use client"

import { ReactNode, createContext } from 'react'

export const ScopeStoreContext = createContext<{[key:string]:any}>({})

export function ScopeStoreProvider({
  children,
  state
}:{
  children: ReactNode,
  state: any
}){
  return <ScopeStoreContext.Provider value={state}>
    { children }
  </ScopeStoreContext.Provider>
}