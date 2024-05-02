/// <reference types="react" />
export interface TypeProps {
    defaultLang: string;
    href?: string;
    lang?: string | string[];
    children?: React.ReactNode;
    [key: string]: any;
}
declare function LinkWithLang(props: TypeProps, ref: React.ReactNode): import("react").JSX.Element;
export default LinkWithLang;
