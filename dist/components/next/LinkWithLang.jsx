// "use client"
// import Link, { LinkProps } from "next/link"
// import { useParams } from "next/navigation"
// export type TypeProps = LinkProps & {
//   defaultLang: string // pass short code, eg: zh, en...
//   lang?: string | string[]
//   children?: React.ReactNode
// }
// function LinkWithLang(props:TypeProps, ref:React.ReactNode){
//   const { href:propsHref, lang:propsLang, defaultLang, children, ...restProps } = props
//   if( !propsHref ){
//     return <span {...restProps}>{children}</span>
//   }
//   const params = useParams()
//   const currentLang = params.lang
//   const redirectTargetLang = propsLang || currentLang
//   const isDefaultLang = redirectTargetLang === defaultLang
//   let href = propsHref
//   if( typeof propsHref === 'string'){
//     href = propsHref.includes('http') ?propsHref :isDefaultLang ?propsHref :`/${redirectTargetLang}${propsHref}`
//   }
//   return <Link href={href} {...restProps}>{children}</Link>
// }
// export default LinkWithLang
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
var LinkWithLang = React.forwardRef(function (props, ref) {
    var propsHref = props.href, propsLang = props.lang, defaultLang = props.defaultLang, children = props.children, restProps = __rest(props, ["href", "lang", "defaultLang", "children"]);
    if (!propsHref) {
        return <span {...restProps}>{children}</span>;
    }
    var params = useParams();
    var currentLang = params.lang;
    var redirectTargetLang = propsLang || currentLang;
    var isDefaultLang = redirectTargetLang === defaultLang;
    var href = propsHref;
    if (typeof propsHref === 'string') {
        href = propsHref.includes('http') ? propsHref : isDefaultLang ? propsHref : "/".concat(redirectTargetLang).concat(propsHref);
    }
    return <Link href={href} {...restProps} ref={ref}>{children}</Link>;
});
LinkWithLang.displayName = 'LinkWithLang';
export default LinkWithLang;
