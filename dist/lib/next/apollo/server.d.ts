import { ApolloClient } from "@apollo/client";
import { IFetchGQLArgs, IMakeApolloClient } from './index';
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
export declare function makeApolloClient(args?: IMakeApolloClient): {
    getClient: () => ApolloClient<import("@apollo/client").NormalizedCacheObject>;
};
export declare function makeFetcher(getClient: Function): (query: TypedDocumentNode, args?: IFetchGQLArgs) => Promise<any>;
