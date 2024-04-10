import React from "react";
type IParamNode = {
    value: unknown;
    className?: string;
    style?: Record<string, string>;
};
export declare function useTranslate(): {
    __: (sourceString: string, params?: (IParamNode | string | number)[]) => string | React.JSX.Element | React.JSX.Element[];
};
export {};
