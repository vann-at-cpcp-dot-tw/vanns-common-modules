interface TypeStore {
    lightbox: string[];
    [key: string]: any;
}
export declare const createStore: (initStore: {
    [key: string]: any;
}) => {
    useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TypeStore>>;
};
export {};
