import queryString from "query-string";
export declare function useSearchObject(): {
    searchParams: import("next/navigation").ReadonlyURLSearchParams;
    searchObject: queryString.ParsedQuery<string | number>;
    searchString: string;
    updateSearch: (updateQuery: {
        [key: string]: any;
    }) => void;
    historyUpdateSearch: (updateQuery: {
        [key: string]: any;
    }) => void;
};
