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
import Link from "next/link";
import { useParams } from "next/navigation";
function LinkWithLang(props, ref) {
    var href = props.href, propsLang = props.lang, defaultLang = props.defaultLang, children = props.children, restProps = __rest(props, ["href", "lang", "defaultLang", "children"]);
    if (!href) {
        return <span {...restProps}>{children}</span>;
    }
    var params = useParams();
    var currentLang = params.lang;
    var redirectTargetLang = propsLang || currentLang;
    var isDefaultLang = redirectTargetLang === defaultLang;
    var path = href.includes('http') ? href : isDefaultLang ? href : "/".concat(redirectTargetLang).concat(href);
    return <Link href={path} {...restProps}>{children}</Link>;
}
export default LinkWithLang;
