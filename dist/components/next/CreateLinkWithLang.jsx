import React from 'react';
import LinkWithLang from './LinkWithLang';
export var createLinkWithLangComponent = function (defaultLang) {
    var WrappedLinkWithLang = React.forwardRef(function (props, ref) {
        return <LinkWithLang {...props} defaultLang={defaultLang} ref={ref}/>;
    });
    WrappedLinkWithLang.displayName = 'WrappedLinkWithLang';
    return WrappedLinkWithLang;
};
