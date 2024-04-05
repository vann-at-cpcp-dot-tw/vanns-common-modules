import { ApolloLink, ApolloClient } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
export type TypeFetchQLArgs = {
    variables?: {
        [key: string]: any;
    };
    context?: {
        [key: string]: any;
    };
};
export declare function makeApolloClient(args?: {
    context?: any;
    memoryCacheOptions?: {
        [key: string]: any;
    };
    middlewares?: ApolloLink[];
}): ApolloClient<import("@apollo/client").NormalizedCacheObject>;
export declare const getClient: () => ApolloClient<any>;
export declare const fetchGQL: (query: TypedDocumentNode, args: TypeFetchQLArgs) => Promise<{
    [key: string]: any;
}>;
