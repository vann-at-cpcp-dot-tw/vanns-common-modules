import { jsx as _jsx } from "react/jsx-runtime";
import { ApolloLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { REVALIDATE } from './index';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
}
// TODO: 此處的 makeClient 和 ./server.ts 裡的 makeClient 為重複 code，曾經嘗試整合兩者(依賴傳入參數決定要 return 哪種 apollo client)，但因 client/server 兩種環境下的 apollo client 實作不同而需要分開處理，暫時使用重複 code 解決
export function makeApolloClient(args) {
    const { uri, context, memoryCacheOptions, middlewares } = args ?? {};
    const dynamicUriLink = new ApolloLink((operation, forward) => {
        const { uri: contextUri } = operation.getContext();
        operation.setContext({
            uri: contextUri || uri // 使用 context 中的 uri 或默認 uri
        });
        return forward(operation);
    });
    const httpLink = createHttpLink({
        uri
    });
    const middleware = setContext((operation, prevContext) => {
        const { headers: prevHeaders } = prevContext;
        return {
            ...prevContext,
            uri: prevContext.uri || operation.context?.uri || uri,
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
        };
    });
    const getClient = () => new ApolloClient({
        cache: new InMemoryCache(memoryCacheOptions || {}),
        link: ApolloLink.from([
            dynamicUriLink,
            middleware,
            ...(middlewares || []),
            httpLink,
        ])
    });
    return {
        getClient,
    };
}
export function ApolloClientProvider({ children, makeClient, }) {
    return _jsx(ApolloNextAppProvider, { makeClient: () => {
            return makeClient();
        }, children: children });
}
