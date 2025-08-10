import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
// 這是一個泛型函數, 用於創建 Provider 組件
export function createScopeStoreProvider() {
    // 創建一個新的 context
    const ScopeStoreContext = createContext(undefined);
    // Provider 組件
    const ScopeStoreProvider = ({ children, state }) => {
        return _jsx(ScopeStoreContext.Provider, { value: state, children: children });
    };
    // 一個自訂的 hook,用於獲取 context 的值
    const useScopeStore = () => {
        const context = useContext(ScopeStoreContext);
        if (!context) {
            throw new Error('useScopeStore must be used within a ScopeStoreProvider');
        }
        return context;
    };
    return { ScopeStoreProvider, useScopeStore };
}
