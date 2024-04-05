import { ApolloLink, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink} from "@apollo/experimental-nextjs-app-support/ssr"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"

export type TypeFetchQLArgs = {
  variables?:{
    [key:string]: any
  }
  context?:{
    [key:string]: any
  },
}

function getURI(operation:any) {
  return operation.getContext().uri || `${process.env.NEXT_PUBLIC_API_BASE}graphql`;
 }

export function makeApolloClient(
  args?:{
    context?: any,
    memoryCacheOptions?: {[key:string]:any}
    middlewares?: ApolloLink[]
  }
){

  const { context, memoryCacheOptions, middlewares } = args ?? {}

  const httpLink = new HttpLink({
    uri: getURI,
  })

  const headerMiddleware = setContext((operation, prevContext) => {
    const { headers:prevHeaders } = prevContext
    return {
      ...prevContext,
      fetchOptions: {
        next: {
          revalidate: context?.revalidate || 60
        },
      },
      headers: {
        ...prevHeaders,
        ...(context?.headers ?? {})
      }
    }
  })

  if( typeof window === "undefined" ){
    return new ApolloClient({
      // cache: new NextSSRInMemoryCache({
      //   typePolicies: {
      //     ZipDTO: {
      //       keyFields: ['name', 'latitude', 'longitude'],
      //     },
      //   },
      // }),
      cache: new InMemoryCache(memoryCacheOptions || {}),
      link: ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        headerMiddleware,
        ...(middlewares || []),
        httpLink,
      ])
    })
  }else{
    return new NextSSRApolloClient({
      // cache: new NextSSRInMemoryCache({
      //   typePolicies: {
      //     ZipDTO: {
      //       keyFields: ['name', 'latitude', 'longitude'],
      //     },
      //   },
      // }),
      cache: new NextSSRInMemoryCache(memoryCacheOptions || {}),
      link: ApolloLink.from([
          headerMiddleware,
          ...(middlewares || []),
          httpLink
        ])
    })
  }
}

export const { getClient } = registerApolloClient(()=>makeApolloClient())

export const fetchGQL = async function(query:TypedDocumentNode, args:TypeFetchQLArgs){
  const { variables:passedVariables, context:passedContext } = args ?? { variables:{}, context:{} }
  const context = passedContext || {}
  const variables = passedVariables || {}
  const result = await getClient().query({
    query,
    variables,
    context,
  })

  return result?.data
}