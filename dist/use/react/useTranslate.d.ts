type IParamNode = {
    value: unknown;
    className?: string;
    style?: Record<string, string>;
};
export default function useTranslate(): {
    __: (sourceString: string, params?: (IParamNode | string | number)[]) => string | undefined;
};
export {};
