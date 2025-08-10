import { ApolloLink, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { REVALIDATE } from './index';
export function makeApolloClient(args) {
    const { uri, context, memoryCacheOptions, middlewares } = args ?? {};
    const httpLink = createHttpLink({
        uri: (operation) => {
            const { uri: contextUri } = operation.getContext();
            return contextUri || uri; // 使用 context 中的 uri 或默認 uri
        }
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
    const { getClient } = registerApolloClient(() => {
        return new ApolloClient({
            cache: new InMemoryCache(memoryCacheOptions || {}),
            link: ApolloLink.from([
                middleware,
                ...(middlewares || []),
                httpLink,
            ])
        });
    });
    return {
        getClient
    };
}
export function makeFetcher(getClient) {
    return async function fetchGQL(query, args) {
        const { variables = {}, context = {} } = args ?? {};
        const updatedContext = {
            ...context,
            uri: context?.uri,
        };
        const result = await getClient().query({
            query,
            variables,
            context: updatedContext
        });
        return result?.data;
    };
}
