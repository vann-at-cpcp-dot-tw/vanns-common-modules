"use client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { makeApolloClient } from "../../lib/next/apollo";
if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
}
export default function ApolloClientProvider(_a) {
    var children = _a.children, makeClient = _a.makeClient;
    return <ApolloNextAppProvider makeClient={function () {
            return (makeClient === null || makeClient === void 0 ? void 0 : makeClient()) || makeApolloClient();
        }}>
    {children}
  </ApolloNextAppProvider>;
}
