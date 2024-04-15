import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
export function createCommonDataContext() {
    var Context = createContext({});
    var Provider = function (_a) {
        var children = _a.children, commonData = _a.commonData;
        return _jsx(Context.Provider, { value: commonData, children: children });
    };
    return { Context: Context, Provider: Provider };
}
