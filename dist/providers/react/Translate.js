"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
export const TranslateContext = createContext({});
export function TranslateProvider({ children, translation }) {
    return _jsx(TranslateContext.Provider, { value: translation, children: children });
}
