/// <reference types="react" />
interface TypeProps {
    href?: string;
    lang: string | string[];
    children: React.ReactNode;
    [key: string]: any;
}
declare function LinkWithLang(props: TypeProps, ref: React.ReactNode): import("react").JSX.Element;
export default LinkWithLang;
