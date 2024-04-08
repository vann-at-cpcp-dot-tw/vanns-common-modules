import { TypeI18n } from "../../config/next/i18n.config";
export declare function tools(i18nConfig: TypeI18n): {
    pathWithLang: (path: string, lang: string) => string;
    convertLocaleCode: (lang: string, to: string) => string | undefined;
    isSupportedLang: (shortCode: string) => boolean;
};
export declare function useLangGuard(i18nConfig: TypeI18n): {
    lang: string | string[];
    localeCode: string | undefined;
};
