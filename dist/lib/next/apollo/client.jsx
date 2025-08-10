var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ApolloLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { REVALIDATE } from './index';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
}
// TODO: 此處的 makeClient 和 ./server.ts 裡的 makeClient 為重複 code，曾經嘗試整合兩者(依賴傳入參數決定要 return 哪種 apollo client)，但因 "@apollo/experimental-nextjs-app-support/ssr" module 在 next.js 這種 client/server 混合式框架下，會報錯，當在 server component 下要引入 NextSSRApolloClient，會提示引入不到，反之亦然，所以只能暫時使用重複 code 解決
// 錯誤訊息：Attempted import error: 'NextSSRApolloClient' is not exported from '@apollo/experimental-nextjs-app-support/ssr' (imported as 'NextSSRApolloClient').
export function makeApolloClient(args) {
    var _a = args !== null && args !== void 0 ? args : {}, uri = _a.uri, context = _a.context, memoryCacheOptions = _a.memoryCacheOptions, middlewares = _a.middlewares;
    var dynamicUriLink = new ApolloLink(function (operation, forward) {
        var contextUri = operation.getContext().uri;
        operation.setContext({
            uri: contextUri || uri // 使用 context 中的 uri 或默認 uri
        });
        return forward(operation);
    });
    var httpLink = createHttpLink({
        uri: uri
    });
    var middleware = setContext(function (operation, prevContext) {
        var _a, _b;
        var prevHeaders = prevContext.headers;
        return __assign(__assign(__assign(__assign({}, prevContext), { uri: prevContext.uri || ((_a = operation.context) === null || _a === void 0 ? void 0 : _a.uri) || uri, fetchOptions: __assign(__assign({}, ((context === null || context === void 0 ? void 0 : context.fetchOptions) || {})), { next: {
                    revalidate: (context === null || context === void 0 ? void 0 : context.revalidate) || REVALIDATE
                } }) }), context), { headers: __assign(__assign({}, prevHeaders), ((_b = context === null || context === void 0 ? void 0 : context.headers) !== null && _b !== void 0 ? _b : {})) });
    });
    var getClient = function () { return new ApolloClient({
        cache: new InMemoryCache(memoryCacheOptions || {}),
        link: ApolloLink.from(__spreadArray(__spreadArray([
            dynamicUriLink,
            middleware
        ], (middlewares || []), true), [
            httpLink,
        ], false))
    }); };
    return {
        getClient: getClient,
    };
}
export function ApolloClientProvider(_a) {
    var children = _a.children, makeClient = _a.makeClient;
    return <ApolloNextAppProvider makeClient={function () {
            return makeClient();
        }}>
    {children}
  </ApolloNextAppProvider>;
}
