import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ApolloLink } from "@apollo/client";
export declare const REVALIDATE: number;
export interface IFetchGQLArgs {
    query: TypedDocumentNode;
    variables?: {
        [key: string]: any;
    };
    context?: {
        [key: string]: any;
    };
}
export interface IMakeApolloClient {
    uri: string;
    context?: any;
    revalidate?: number;
    memoryCacheOptions?: {
        [key: string]: any;
    };
    middlewares?: ApolloLink[];
}
