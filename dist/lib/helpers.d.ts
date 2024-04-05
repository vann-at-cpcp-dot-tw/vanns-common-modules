export function isEmpty(value: any): boolean;
export function shareFb(url: any): void;
export function shareLine(url: any, title: any): void;
export function shareTwitter(url: any, title: any): void;
export function shareLinkedin(url: any): void;
export function numberWithCommas(x: any, digits?: number): any;
export function numberWithKMB(num: any, digits: any): string;
export function roundDecimal(val: any, precision?: number): number;
export function rand(min: any, max: any): any;
export function arrayGenerate(start: any, end: any, step?: number): any[];
export function arrayShuffle(a: any): any;
export function arrayRandom({ min, max, length, step }?: {
    min?: number;
    max?: number;
    length?: number;
    step?: number;
}): any;
export function arrayChunk(myArray: any, chunk_size: any): any[];
export function getDecimalPlace(num: any): number | undefined;
export function scrollToSection({ el, speed, offset, callback }: {
    el: any;
    speed?: number | undefined;
    offset?: number | undefined;
    callback?: (() => void) | undefined;
}): void;
export function getItemPositionInViewport({ el, based }: {
    el: any;
    based?: string | undefined;
}): number | undefined;
export function padLeft(n: any, width: any, z: any): any;
export function charBytes(str: any): any;
export function strWidth(text?: string, fontCssProps?: string): number;
export function toCamelCase(str?: string, breakKey?: string, upperCamelCase?: boolean): string;
export function convertYoutubeUrlToEmbed(input: any): any;
export function calcSizeByRatio({ w, h, ratio }: {
    w: any;
    h: any;
    ratio: any;
}): {
    w: any;
    h: number;
} | {
    w: number;
    h: any;
} | undefined;
export function getContainedSize(img: any): any[];
