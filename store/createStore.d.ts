export interface IStore {
    [key: string]: any;
}
export declare const createStore: (initStore: IStore) => {
    useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<IStore>>;
};
