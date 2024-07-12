import React from "react";
import { LinkProps } from "next/link";
import { HTMLProps } from "react";
export type TypeProps = HTMLProps<HTMLAnchorElement> & LinkProps & {
    defaultLang: string;
    lang?: string | string[];
    children?: React.ReactNode;
};
declare const LinkWithLang: React.ForwardRefExoticComponent<Omit<TypeProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export default LinkWithLang;
