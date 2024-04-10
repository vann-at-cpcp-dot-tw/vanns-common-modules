"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx } from "react/jsx-runtime";
import Link from "next/link";
import { useParams } from "next/navigation";
function LinkWithLang(props, ref) {
    var href = props.href, propsLang = props.lang, defaultLang = props.defaultLang, children = props.children, restProps = __rest(props, ["href", "lang", "defaultLang", "children"]);
    if (!href) {
        return _jsx("span", __assign({}, restProps, { children: children }));
    }
    var params = useParams();
    var currentLang = params.lang;
    var redirectTargetLang = propsLang || currentLang;
    var isDefaultLang = redirectTargetLang === defaultLang;
    var path = isDefaultLang ? href : "/".concat(redirectTargetLang).concat(href);
    return _jsx(Link, __assign({ href: path }, restProps, { children: children }));
}
export default LinkWithLang;
