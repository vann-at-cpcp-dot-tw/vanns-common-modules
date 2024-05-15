import { ReactNode } from 'react';
export declare const TranslateContext: import("react").Context<{
    [key: string]: string;
}>;
export declare function TranslateProvider({ children, translation }: {
    children: ReactNode;
    translation: {
        [key: string]: string;
    };
}): import("react").JSX.Element;
