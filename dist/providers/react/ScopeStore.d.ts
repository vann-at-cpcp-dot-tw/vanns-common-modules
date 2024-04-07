import { ReactNode } from 'react';
export declare const ScopeStoreContext: import("react").Context<{
    [key: string]: any;
}>;
export declare function ScopeStoreProvider({ children, state }: {
    children: ReactNode;
    state: any;
}): import("react").JSX.Element;
