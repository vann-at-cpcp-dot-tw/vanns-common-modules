import { ReactNode } from "react";
import { ApolloClient } from "@apollo/client-integration-nextjs";
import { IMakeApolloClient } from './index';
export declare function makeApolloClient(args?: IMakeApolloClient): {
    getClient: () => ApolloClient<unknown>;
};
export declare function ApolloClientProvider({ children, makeClient, }: {
    children: ReactNode;
    makeClient: Function;
}): import("react/jsx-runtime").JSX.Element;
