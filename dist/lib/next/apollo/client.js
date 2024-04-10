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
import { jsx as _jsx } from "react/jsx-runtime";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink, ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
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
    var httpLink = new HttpLink({
        uri: uri
    });
    var middleware = setContext(function (operation, prevContext) {
        var _a;
        var prevHeaders = prevContext.headers;
        return __assign(__assign(__assign(__assign({}, prevContext), { fetchOptions: __assign(__assign({}, ((context === null || context === void 0 ? void 0 : context.fetchOptions) || {})), { next: {
                    revalidate: (context === null || context === void 0 ? void 0 : context.revalidate) || REVALIDATE
                } }) }), context), { headers: __assign(__assign({}, prevHeaders), ((_a = context === null || context === void 0 ? void 0 : context.headers) !== null && _a !== void 0 ? _a : {})) });
    });
    var getClient = function () { return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(memoryCacheOptions || {}),
        link: typeof window === "undefined"
            ? ApolloLink.from(__spreadArray(__spreadArray([
                new SSRMultipartLink({
                    stripDefer: true,
                }),
                middleware
            ], (middlewares || []), true), [
                httpLink,
            ], false))
            : ApolloLink.from(__spreadArray(__spreadArray([
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
    return _jsx(ApolloNextAppProvider, { makeClient: function () {
            return makeClient();
        }, children: children });
}
