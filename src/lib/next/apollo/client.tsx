import { ReactNode } from "react"
import { ApolloLink, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink, ApolloNextAppProvider} from "@apollo/experimental-nextjs-app-support/ssr"
import { REVALIDATE, IMakeApolloClient } from './index'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

// TODO: 此處的 makeClient 和 ./server.ts 裡的 makeClient 為重複 code，曾經嘗試整合兩者(依賴傳入參數決定要 return 哪種 apollo client)，但因 "@apollo/experimental-nextjs-app-support/ssr" module 在 next.js 這種 client/server 混合式框架下，會報錯，當在 server component 下要引入 NextSSRApolloClient，會提示引入不到，反之亦然，所以只能暫時使用重複 code 解決
// 錯誤訊息：Attempted import error: 'NextSSRApolloClient' is not exported from '@apollo/experimental-nextjs-app-support/ssr' (imported as 'NextSSRApolloClient').

export function makeClient(args?:IMakeApolloClient){

  const { uri, context,  memoryCacheOptions, middlewares } = args ?? {}

  const httpLink = new HttpLink({
    uri
  })

  const middleware = setContext((operation, prevContext) => {
    const { headers:prevHeaders } = prevContext
    return {
      ...prevContext,
      fetchOptions: {
        ...(context?.fetchOptions || {}),
        next: {
          revalidate: context?.revalidate || REVALIDATE
        },
      },
      ...context,
      headers: {
        ...prevHeaders,
        ...(context?.headers ?? {})
      }
    }
  })


  const getClient = ()=> new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(memoryCacheOptions || {}),
    link: typeof window === "undefined"
      ? ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        middleware,
        ...(middlewares || []),
        httpLink,
      ])
      : ApolloLink.from([
        middleware,
        ...(middlewares || []),
        httpLink,
      ])
  })

  return {
    getClient,
  }
}

export function ApolloClientProvider({
  children,
  makeClient,
}:{
  children: ReactNode,
  makeClient: Function
}){
  return <ApolloNextAppProvider
  makeClient={()=>{
    return makeClient()
  }}>
    { children }
  </ApolloNextAppProvider>
}