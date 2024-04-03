"use client"
import { ReactNode } from "react"
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import useLangGuard from "~/use/next/useLangGuard"
import { makeApolloClient } from "~/lib/next/apollo"

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

export default function ApolloClientProvider({
  children
}:{
  children: ReactNode,
}){
  const { localeCode } = useLangGuard()
  return <ApolloNextAppProvider makeClient={()=>{
    return makeApolloClient({
      context: {
        headers: {
          "accept-language": localeCode
        }
      }
    })
  }}>
    { children }
  </ApolloNextAppProvider>
}