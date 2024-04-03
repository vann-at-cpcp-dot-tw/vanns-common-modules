"use client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import useLangGuard from "~/use/next/useLangGuard";
import { makeApolloClient } from "~/lib/next/apollo";
if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
}
export default function ApolloClientProvider(_a) {
    var children = _a.children;
    var localeCode = useLangGuard().localeCode;
    return <ApolloNextAppProvider makeClient={function () {
            return makeApolloClient({
                context: {
                    headers: {
                        "accept-language": localeCode
                    }
                }
            });
        }}>
    {children}
  </ApolloNextAppProvider>;
}
