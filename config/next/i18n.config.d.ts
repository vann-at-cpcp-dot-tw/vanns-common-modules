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
export type Locale = (typeof i18n)['locales'][number];
