interface TypeState {
    width: number;
    height: number;
    node: HTMLDivElement | null;
}
export declare function useDomNodeSize(): {
    size: TypeState;
    setNode: (refNode: HTMLDivElement) => void;
};
export {};
