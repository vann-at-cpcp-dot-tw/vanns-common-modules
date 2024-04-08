export declare const i18n: {
    readonly defaultLocale: {
        code: string;
        shortCode: string;
        name: string;
    };
    readonly locales: {
        code: string;
        shortCode: string;
        name: string;
    }[];
};
export type TypeI18n = typeof i18n;
export type Locale = (typeof i18n)['locales'][number];
