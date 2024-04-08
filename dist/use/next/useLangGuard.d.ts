export declare const pathWithLang: (path: string, lang: string) => string;
export declare const convertLocaleCode: (lang: string, to: string) => any;
export declare const isSupportedLang: (shortCode: string) => boolean;
export declare function useLangGuard(): {
    lang: string | string[];
    localeCode: any;
};
