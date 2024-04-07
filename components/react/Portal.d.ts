/// <reference types="react" />
interface TypeProps {
    children: React.ReactNode;
    dom: HTMLElement;
}
declare function Portal(props: TypeProps): import("react").ReactPortal;
export default Portal;
