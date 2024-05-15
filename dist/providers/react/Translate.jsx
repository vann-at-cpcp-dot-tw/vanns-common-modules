"use client";
import { createContext } from 'react';
export var TranslateContext = createContext({});
export function TranslateProvider(_a) {
    var children = _a.children, translation = _a.translation;
    return <TranslateContext.Provider value={translation}>
    {children}
  </TranslateContext.Provider>;
}
