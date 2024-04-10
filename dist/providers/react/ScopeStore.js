"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from 'react';
export var ScopeStoreContext = createContext({});
export function ScopeStoreProvider(_a) {
    var children = _a.children, state = _a.state;
    return _jsx(ScopeStoreContext.Provider, { value: state, children: children });
}
