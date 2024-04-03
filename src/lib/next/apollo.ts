import { ApolloLink, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { convertLocaleCode } from "~/use/next/useLangGuard"
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink} from "@apollo/experimental-nextjs-app-support/ssr"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API
const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE || 60)

interface TypeFetchQLArgs {
  lang: string
  variables?:{
    [key:string]: any
  }
  context?:{
    [key:string]: any
  }
}

export function makeApolloClient(args?:{context?:any}){

  const { context } = args ?? {}

  const httpLink = new HttpLink({
    uri: GRAPHQL_API_URL,
  })

  const middleware = setContext((operation, prevContext) => {
    const { headers:prevHeaders } = prevContext
    return {
      ...prevContext,
      headers: {
        ...prevHeaders,
        ...(context.headers ?? {})
      }
    }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      // typePolicies: {
      //   ZipDTO: {
      //     keyFields: ['name', 'latitude', 'longitude'],
      //   },
      // },
    }),
    link: typeof window === "undefined"
      ? ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        middleware,
        httpLink,
      ])
      : ApolloLink.from([
        middleware,
        httpLink
      ])
  })
}

export const { getClient } = registerApolloClient(()=>{
  return makeApolloClient()
})

export const fetchGQL = async function(query:TypedDocumentNode, args:TypeFetchQLArgs){
  const { variables, context, lang } = args ?? { variables: {}, context: null, lang: 'zh' }
  const localeCode = convertLocaleCode(lang, 'long')

  const result = await getClient().query({
    query,
    variables: variables ?variables :{},
    context: context
      ? {
        fetchOptions: {
          next: {
            revalidate
          },
        },
        ...{
          ...context,
          headers: {
            ...(context?.headers || {}),
            "accept-language": localeCode
          }
        }
      }
      : {
        headers: {
          "accept-language": localeCode
        },
        fetchOptions: {
          next: {
            revalidate
          },
        },
      },
  })

  return result?.data
}