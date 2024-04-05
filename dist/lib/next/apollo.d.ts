import { ApolloLink, ApolloClient } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
export interface IFetchGQLArgs {
    variables?: {
        [key: string]: any;
    };
    context?: {
        [key: string]: any;
    };
    getClient?: Function;
    [key: string]: any;
}
export interface IMakeApolloClient {
    uri?: string;
    context?: any;
    isRSC?: boolean;
    revalidate?: number;
    memoryCacheOptions?: {
        [key: string]: any;
    };
    middlewares?: ApolloLink[];
}
export declare function makeApolloClient(args?: IMakeApolloClient): {
    getClient: () => ApolloClient<any>;
};
export declare const fetchGQL: (query: TypedDocumentNode, args: IFetchGQLArgs) => Promise<any>;
