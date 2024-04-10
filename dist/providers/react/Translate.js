"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
export var TranslateContext = createContext({});
export function TranslateProvider(_a) {
    var children = _a.children, translation = _a.translation;
    return _jsx(TranslateContext.Provider, { value: translation, children: children });
}
