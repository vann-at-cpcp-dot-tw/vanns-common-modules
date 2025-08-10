import { IParamNode } from "../../use/react";
interface IProps {
    id?: string;
    className?: string;
    text: string;
    vars?: (IParamNode | string | number)[];
}
export default function T(props: IProps, ref: React.ReactNode): import("react").JSX.Element;
export {};
