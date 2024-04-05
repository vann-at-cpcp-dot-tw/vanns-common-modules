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
import { useCallback, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
export default function useSearchObject() {
    var router = useRouter();
    var pathname = usePathname();
    var searchParams = useSearchParams();
    var searchString = useMemo(function () {
        return searchParams.toString();
    }, [searchParams]);
    var searchObject = useMemo(function () {
        return queryString.parse(searchString, {
            arrayFormat: 'comma',
            parseNumbers: true,
        });
    }, [searchString]);
    // const updateSearch = function(updateQuery:{[key:string]:any}){
    //   const currentSearch = queryString.parse(location.search, {
    //     arrayFormat: 'comma',
    //     parseNumbers: true,
    //   })
    //   router.push(`
    //     ${pathname}?${
    //     queryString.stringify({
    //       ...currentSearch,
    //       ...updateQuery,
    //     }, {arrayFormat: 'comma'})}
    //   `)
    // }
    var updateSearch = useCallback(function (updateQuery) {
        var currentSearch = queryString.parse(location.search, {
            arrayFormat: 'comma',
            parseNumbers: true,
        });
        router.push("\n      ".concat(pathname, "?").concat(queryString.stringify(__assign(__assign({}, currentSearch), updateQuery), { arrayFormat: 'comma' }), "\n    "));
    }, [router, pathname]);
    var historyUpdateSearch = useCallback(function (updateQuery) {
        var currentSearch = queryString.parse(location.search, {
            arrayFormat: 'comma',
            parseNumbers: true,
        });
        history.pushState(null, '', "\n      ".concat(pathname, "?").concat(queryString.stringify(__assign(__assign({}, currentSearch), updateQuery), { arrayFormat: 'comma' }), "\n    "));
    }, [pathname]);
    return {
        searchParams: searchParams,
        searchObject: searchObject,
        searchString: searchString,
        updateSearch: updateSearch,
        historyUpdateSearch: historyUpdateSearch
    };
}