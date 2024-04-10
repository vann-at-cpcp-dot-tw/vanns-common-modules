import { ReactNode } from "react";
import { NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";
import { IMakeApolloClient } from './index';
export declare function makeApolloClient(args?: IMakeApolloClient): {
    getClient: () => NextSSRApolloClient<import("@apollo/client").NormalizedCacheObject>;
};
export declare function ApolloClientProvider({ children, makeClient, }: {
    children: ReactNode;
    makeClient: Function;
}): import("react/jsx-runtime").JSX.Element;
