interface TypeState {
    width: number;
    height: number;
    node: HTMLDivElement | null;
}
export default function useDomNodeSize(): {
    size: TypeState;
    setNode: (refNode: HTMLDivElement) => void;
};
export {};
