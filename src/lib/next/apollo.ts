import { ApolloLink, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink} from "@apollo/experimental-nextjs-app-support/ssr"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE}graphql`
const REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 60)

export interface IFetchGQL {
  query: TypedDocumentNode
  args?: {
    variables?: {
      [key:string]: any
    }
    context?:{
      [key:string]: any
    }
    getClient?: Function
  }
}

export interface IMakeApolloClient {
  uri?: string
  context?: any,
  isRSC?: boolean
  revalidate?: number,
  memoryCacheOptions?: {[key:string]:any}
  middlewares?: ApolloLink[]
}


export function makeApolloClient(args?:IMakeApolloClient){

  const { uri, context, isRSC, memoryCacheOptions, middlewares } = args ?? {}

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

  // server side fetch
  if( isRSC ){
    const { getClient } = registerApolloClient(() => {
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

  // client side
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

export const fetchGQL = async function({query, args}:IFetchGQL){

  const { variables:passedVariables, context:passedContext } = args ?? { variables:{}, context:{} }
  const context = passedContext || {}
  const variables = passedVariables || {}
  let getClient = args?.getClient

  if( typeof getClient !== 'function' ){
    getClient = makeApolloClient({
      uri: API_URL,
      isRSC: true,
      context,
    }).getClient
  }

  const result = await getClient().query({
    query,
    variables,
    context,
  })

  return result?.data
}