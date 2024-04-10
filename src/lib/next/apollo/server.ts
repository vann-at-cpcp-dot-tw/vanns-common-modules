import { ApolloLink, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { REVALIDATE, IFetchGQLArgs, IMakeApolloClient } from './index'
import { TypedDocumentNode } from "@graphql-typed-document-node/core"

export function makeApolloClient(args?:IMakeApolloClient){

  const { uri, context, memoryCacheOptions, middlewares } = args ?? {}

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

  const { getClient } = registerApolloClient(()=>{
    return new ApolloClient({
      cache: new InMemoryCache(memoryCacheOptions || {}),
      link: ApolloLink.from([
        middleware,
        ...(middlewares || []),
        httpLink,
      ])
    })
  })

  return {
    getClient
  }
}

export function makeFetcher(getClient:Function){
  return async function fetchGQL(query:TypedDocumentNode, args?:IFetchGQLArgs){
    const result = await getClient().query(args)
    return result?.data
  }
}