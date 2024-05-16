import queryString from "query-string";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
export declare function useSearchObject(): {
    searchParams: import("next/navigation").ReadonlyURLSearchParams;
    searchObject: queryString.ParsedQuery<string | number>;
    searchString: string;
    updateSearch: (updateQuery: {
        [key: string]: any;
    }, options?: NavigateOptions) => void;
    historyUpdateSearch: (updateQuery: {
        [key: string]: any;
    }) => void;
};
