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
export function useSearchObject() {
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
    var updateSearch = useCallback(function (updateQuery, pushOptions) {
        var currentSearch = queryString.parse(location.search, {
            arrayFormat: 'comma',
            parseNumbers: true,
        });
        router.push("\n      ".concat(pathname, "?").concat(queryString.stringify(__assign(__assign({}, currentSearch), updateQuery), { arrayFormat: 'comma' }), "\n    "), { scroll: (pushOptions === null || pushOptions === void 0 ? void 0 : pushOptions.scroll) || false });
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
