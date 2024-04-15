import { ReactNode, createContext } from 'react'

export interface CommonDataContextType<T> {
  [key: string]: T
}

export function createCommonDataContext<T>(): {
  Context: React.Context<CommonDataContextType<T>>,
  Provider: React.FC<{ children: ReactNode, commonData: CommonDataContextType<T> }>
  } {
  const Context = createContext<CommonDataContextType<T>>({})
  const Provider: React.FC<{ children: ReactNode, commonData: CommonDataContextType<T> }> = ({ children, commonData }) => {
    return <Context.Provider value={commonData}>{children}</Context.Provider>
  }
  return { Context, Provider }
}