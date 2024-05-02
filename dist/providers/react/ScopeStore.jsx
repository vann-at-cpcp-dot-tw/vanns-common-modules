import { createContext, useContext } from 'react';
// 這是一個泛型函數, 用於創建 Provider 組件
export function createScopeStoreProvider() {
    // 創建一個新的 context
    var ScopeStoreContext = createContext(undefined);
    // Provider 組件
    var ScopeStoreProvider = function (_a) {
        var children = _a.children, state = _a.state;
        return <ScopeStoreContext.Provider value={state}>
      {children}
    </ScopeStoreContext.Provider>;
    };
    // 一個自訂的 hook,用於獲取 context 的值
    var useScopeStore = function () {
        var context = useContext(ScopeStoreContext);
        if (!context) {
            throw new Error('useScopeStore must be used within a ScopeStoreProvider');
        }
        return context;
    };
    return { ScopeStoreProvider: ScopeStoreProvider, useScopeStore: useScopeStore };
}
/****************** 使用方法 ******************


//=================  創建方  =================//
// 定義 state 的類型
interface MyState {
  count: number
  setCount: () => void
  // ...其他屬性
}

// 創建一個新的 Provider 組件
export const { ScopeStoreProvider, useScopeStore } = createScopeStoreProvider<MyState>()
const [count, setCount] = useState(0)
<ScopeStoreProvider state={{
  count,
  setCount
}}>
  <ChildrenComponent />
</ScopeStoreProvider>



//=================  使用方  =================//
import { useScopeStore } from '/path/to/export'
const scopeStore = useScopeStore()
console.log(scopeStore.count)


****************** 使用方法 ******************/
