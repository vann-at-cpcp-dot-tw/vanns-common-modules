import { ReactNode } from 'react';
export interface CommonDataContextType {
    [key: string]: any;
}
export declare const CommonDataContext: import("react").Context<{}>;
export declare function CommonDataProvider({ children, commonData }: {
    children: ReactNode;
    commonData: any;
}): import("react").JSX.Element;
