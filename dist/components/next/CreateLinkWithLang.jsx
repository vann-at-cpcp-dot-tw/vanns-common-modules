import React from 'react';
import LinkWithLang from './LinkWithLang';
export const createLinkWithLangComponent = (defaultLang) => {
    const WrappedLinkWithLang = React.forwardRef((props, ref) => {
        return <LinkWithLang {...props} defaultLang={defaultLang} ref={ref}/>;
    });
    WrappedLinkWithLang.displayName = 'WrappedLinkWithLang';
    return WrappedLinkWithLang;
};
