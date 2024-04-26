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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
// 原始的 LinkWithLang 組件
import LinkWithLang from './LinkWithLang';
// 創建一個高階組件工廠函數
var createLinkWithLangComponent = function (defaultLang) {
    var WrappedLinkWithLang = React.forwardRef(function (props, ref) {
        return _jsx(LinkWithLang, __assign({}, props, { defaultLang: defaultLang, ref: ref }));
    });
    WrappedLinkWithLang.displayName = 'WrappedLinkWithLang';
    return WrappedLinkWithLang;
};
export default createLinkWithLangComponent;
