import { ApolloLink } from "@apollo/client";
export declare const REVALIDATE: number;
export interface IFetchGQLArgs {
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
