import { ReactNode } from 'react';
export declare function createScopeStoreProvider<T>(): {
    ScopeStoreProvider: ({ children, state }: {
        children: ReactNode;
        state: T;
    }) => import("react/jsx-runtime").JSX.Element;
    useScopeStore: () => NonNullable<T>;
};
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
