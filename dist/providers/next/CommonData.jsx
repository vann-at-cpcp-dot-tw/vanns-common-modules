"use client";
import { createContext } from 'react';
export var CommonDataContext = createContext({});
export default function CommonDataProvider(_a) {
    var children = _a.children, commonData = _a.commonData;
    return <CommonDataContext.Provider value={commonData}>
    {children}
  </CommonDataContext.Provider>;
}
