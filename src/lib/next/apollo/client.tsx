import { ReactNode } from "react"
import { ApolloLink, createHttpLink } from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { SSRMultipartLink, ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs"
import { REVALIDATE, IMakeApolloClient } from './index'
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

// TODO: 此處的 makeClient 和 ./server.ts 裡的 makeClient 為重複 code，曾經嘗試整合兩者(依賴傳入參數決定要 return 哪種 apollo client)，但因 client/server 兩種環境下的 apollo client 實作不同而需要分開處理，暫時使用重複 code 解決

export function makeApolloClient(args?:IMakeApolloClient){

  const { uri, context,  memoryCacheOptions, middlewares } = args ?? {}


  const httpLink = createHttpLink({
    uri: (operation) => {
      const { uri: contextUri } = operation.getContext()
      return contextUri || uri // 使用 context 中的 uri 或默認 uri
    }
  })

  const middleware = new SetContextLink((prevContext, operation) => {
    const { headers:prevHeaders } = prevContext
    return {
      ...prevContext,
      uri: prevContext.uri || uri,
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

  const getClient = ()=> new ApolloClient({
  cache: new InMemoryCache(memoryCacheOptions || {}),
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