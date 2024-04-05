"use client"
import { ReactNode } from "react"
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import { makeApolloClient } from "~/lib/next/apollo"

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

export default function ApolloClientProvider({
  children,
  makeClient,
}:{
  children: ReactNode,
  makeClient?: Function
}){
  return <ApolloNextAppProvider makeClient={()=>{
    return makeClient?.() || makeApolloClient()
  }}>
    { children }
  </ApolloNextAppProvider>
}