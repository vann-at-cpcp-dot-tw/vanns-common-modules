export declare const isEmpty: (value: any) => boolean;
export declare const shareFb: (url: string) => void;
export declare const shareLine: (url: string, title: string) => void;
export declare const shareTwitter: (url: string, title: string) => void;
export declare const shareLinkedin: (url: string) => void;
export declare const numberFormat: (num: any, options?: Intl.NumberFormatOptions & {
    locale?: string;
}) => string;
interface ISIUnit {
    value: number;
    symbol: string;
}
interface INumberWithKMBArgs {
    si?: ISIUnit[];
    formatterOptions?: Intl.NumberFormatOptions & {
        locale?: string;
    };
}
export declare const numberWithKMB: (num: any, args: INumberWithKMBArgs) => string;
export declare const roundDecimal: (val: number, digits?: number) => number;
export declare const rand: (min: number, max: number) => number;
export declare const arrayGenerate: (start: number, end: number, step?: number) => number[];
export declare const arrayShuffle: (a: any[]) => any[];
export declare const arrayRandom: ({ min, max, length, step }?: {
    min?: number;
    max?: number;
    length?: number;
    step?: number;
}) => number[];
export declare const arrayChunk: (myArray: any[], chunkSize: number) => any[][];
export declare const getDecimalPlace: (num: number) => number;
export declare const scrollToSection: ({ el, speed, offset }: any) => void;
export declare const getItemPositionInViewport: ({ el, based }: {
    el: HTMLElement;
    based?: string | undefined;
}) => number | undefined;
export declare const padLeft: (n: number | string, width: number, z?: string) => string;
export declare const charBytes: (str: string) => number;
export declare const strWidth: (text?: string, fontCssProps?: string) => number;
export declare const toCamelCase: (str?: string, breakKey?: string, upperCamelCase?: boolean) => string;
export declare const calcSizeByRatio: ({ w, h, ratio }: {
    w?: number | undefined;
    h?: number | undefined;
    ratio: number;
}) => {
    w: number;
    h: number;
} | undefined;
export declare const getContainedSize: (img: HTMLImageElement) => number[];
export {};
