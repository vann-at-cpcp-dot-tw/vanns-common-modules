"use client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
}
export default function ApolloClientProvider(_a) {
    var children = _a.children, makeClient = _a.makeClient;
    return <ApolloNextAppProvider makeClient={function () {
            return makeClient();
        }}>
    {children}
  </ApolloNextAppProvider>;
}
