"use client"
import {  ReactNode, createContext } from 'react'
export interface CommonDataContextType {
  [key: string]: any
}
export const CommonDataContext = createContext<CommonDataContextType>({})
export default function CommonDataProvider({
  children,
  commonData
}:{
  children: ReactNode,
  commonData: any
}){
  return <CommonDataContext.Provider value={commonData}>
    { children }
  </CommonDataContext.Provider>
}