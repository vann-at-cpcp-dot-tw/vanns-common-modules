"use client";
import { createContext } from 'react';
export const TranslateContext = createContext({});
export function TranslateProvider({ children, translation }) {
    return <TranslateContext.Provider value={translation}>
    {children}
  </TranslateContext.Provider>;
}
