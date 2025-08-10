import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import LinkWithLang from './LinkWithLang';
export const createLinkWithLangComponent = (defaultLang) => {
    const WrappedLinkWithLang = React.forwardRef((props, ref) => {
        return _jsx(LinkWithLang, { ...props, defaultLang: defaultLang, ref: ref });
    });
    WrappedLinkWithLang.displayName = 'WrappedLinkWithLang';
    return WrappedLinkWithLang;
};
