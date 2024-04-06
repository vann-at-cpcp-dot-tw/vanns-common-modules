"use client"
import {  ReactNode, createContext } from 'react'
export const TranslateContext = createContext<{[key:string]:string}>({})
export default function TranslateProvider({
  children,
  translation
}:{
  children: ReactNode,
  translation: {[key:string]: string}
}){
  return <TranslateContext.Provider value={translation}>
    { children }
  </TranslateContext.Provider>
}