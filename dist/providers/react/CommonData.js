"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
export var CommonDataContext = createContext({});
export function CommonDataProvider(_a) {
    var children = _a.children, commonData = _a.commonData;
    return _jsx(CommonDataContext.Provider, { value: commonData, children: children });
}
