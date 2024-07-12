/// <reference types="node" />
import React from "react";
import { LinkProps } from "next/link";
export type TypeProps = LinkProps & {
    defaultLang: string;
    lang?: string | string[];
    children?: React.ReactNode;
};
declare const LinkWithLang: React.ForwardRefExoticComponent<{
    href: string | import("url").UrlObject;
    as?: (string | import("url").UrlObject) | undefined;
    replace?: boolean | undefined;
    scroll?: boolean | undefined;
    shallow?: boolean | undefined;
    passHref?: boolean | undefined;
    prefetch?: boolean | undefined;
    locale?: string | false | undefined;
    legacyBehavior?: boolean | undefined;
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement> | undefined;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
} & {
    defaultLang: string;
    lang?: string | string[] | undefined;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>>;
export default LinkWithLang;
