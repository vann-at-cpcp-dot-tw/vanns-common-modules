"use client";
import { createContext } from 'react';
export var ScopeStoreContext = createContext({});
export function ScopeStoreProvider(_a) {
    var children = _a.children, state = _a.state;
    return <ScopeStoreContext.Provider value={state}>
    {children}
  </ScopeStoreContext.Provider>;
}
