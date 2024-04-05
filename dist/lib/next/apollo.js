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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { ApolloLink, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
var API_URL = "".concat(process.env.NEXT_PUBLIC_API_BASE, "graphql");
var REVALIDATE = Number(process.env.NEXT_PUBLIC_REVALIDATE || 60);
export function makeApolloClient(args) {
    var _a = args !== null && args !== void 0 ? args : {}, uri = _a.uri, context = _a.context, isRSC = _a.isRSC, memoryCacheOptions = _a.memoryCacheOptions, middlewares = _a.middlewares;
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
    // server side fetch
    if (isRSC) {
        var getClient_1 = registerApolloClient(function () {
            return new ApolloClient({
                cache: new InMemoryCache(memoryCacheOptions || {}),
                link: ApolloLink.from(__spreadArray(__spreadArray([
                    middleware
                ], (middlewares || []), true), [
                    httpLink,
                ], false))
            });
        }).getClient;
        return {
            getClient: getClient_1
        };
    }
    // client side
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
export var fetchGQL = function (_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var _c, passedVariables, passedContext, context, variables, getClient, result;
        var query = _b.query, args = _b.args;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = args !== null && args !== void 0 ? args : { variables: {}, context: {} }, passedVariables = _c.variables, passedContext = _c.context;
                    context = passedContext || {};
                    variables = passedVariables || {};
                    getClient = args === null || args === void 0 ? void 0 : args.getClient;
                    if (typeof getClient !== 'function') {
                        getClient = makeApolloClient({
                            uri: API_URL,
                            isRSC: true,
                            context: context,
                        }).getClient;
                    }
                    return [4 /*yield*/, getClient().query({
                            query: query,
                            variables: variables,
                            context: context,
                        })];
                case 1:
                    result = _d.sent();
                    return [2 /*return*/, result === null || result === void 0 ? void 0 : result.data];
            }
        });
    });
};
