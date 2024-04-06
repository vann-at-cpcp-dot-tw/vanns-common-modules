"use client"

import { ReactNode } from "react"
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

export function ApolloClientProvider({
  children,
  makeClient,
}:{
  children: ReactNode,
  makeClient: Function
}){
  return <ApolloNextAppProvider makeClient={()=>{
    return makeClient()
  }}>
    { children }
  </ApolloNextAppProvider>
}