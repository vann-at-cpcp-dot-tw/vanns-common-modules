/// <reference types="react" />
interface TypeProps {
    children: React.ReactNode;
    dom: HTMLElement;
}
export default function Portal(props: TypeProps): import("react").ReactPortal;
export {};
