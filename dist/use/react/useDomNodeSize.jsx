import { useState, useCallback, useEffect } from "react";
export function useDomNodeSize() {
    const [state, setState] = useState({
        width: 0,
        height: 0,
        node: null,
    });
    const setNode = useCallback((refNode) => {
        if (refNode) {
            setState({
                width: refNode.getBoundingClientRect().width,
                height: refNode.getBoundingClientRect().height,
                node: refNode
            });
        }
    }, []);
    useEffect(() => {
        const targetElement = state.node;
        if (!targetElement) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            setState({
                width: targetElement.getBoundingClientRect().width,
                height: targetElement.getBoundingClientRect().height,
                node: targetElement
            });
        });
        resizeObserver.observe(targetElement);
        return () => {
            resizeObserver.disconnect();
        };
    }, [state.node]);
    return {
        size: state,
        setNode
    };
}
