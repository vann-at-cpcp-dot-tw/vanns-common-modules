import { ReactNode } from "react";
export default function ApolloClientProvider({ children, makeClient, }: {
    children: ReactNode;
    makeClient?: Function;
}): import("react").JSX.Element;
