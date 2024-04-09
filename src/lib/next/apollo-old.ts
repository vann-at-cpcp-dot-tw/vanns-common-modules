import { ApolloLink, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink} from "@apollo/experimental-nextjs-app-support/ssr"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"

const REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 60)

export interface IFetchGQLArgs {
  query: TypedDocumentNode,
  variables?: {
    [key:string]: any;
  }
  context?:{
    [key:string]: any;
  }
}

export interface IMakeApolloClient {
  uri: string;
  context?: any;
  isRSC?: boolean; // is React Server Component
  revalidate?: number;
  memoryCacheOptions?: {[key:string]:any};
  middlewares?: ApolloLink[];
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

export const fetchGQL = async function(getClient:Function, args:IFetchGQLArgs){
  const result = await getClient().query(args)
  return result?.data
}