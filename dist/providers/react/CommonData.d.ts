import { ReactNode } from 'react';
export interface CommonDataContextType<T> {
    [key: string]: T;
}
export declare function createCommonDataContext<T>(): {
    Context: React.Context<CommonDataContextType<T>>;
    Provider: React.FC<{
        children: ReactNode;
        commonData: CommonDataContextType<T>;
    }>;
};
