import { useState, useCallback, useEffect } from "react";
export function useDomNodeSize() {
    var _a = useState({
        width: 0,
        height: 0,
        node: null,
    }), state = _a[0], setState = _a[1];
    var setNode = useCallback(function (refNode) {
        if (refNode) {
            setState({
                width: refNode.getBoundingClientRect().width,
                height: refNode.getBoundingClientRect().height,
                node: refNode
            });
        }
    }, []);
    useEffect(function () {
        var targetElement = state.node;
        if (!targetElement) {
            return;
        }
        var resizeObserver = new ResizeObserver(function () {
            setState({
                width: targetElement.getBoundingClientRect().width,
                height: targetElement.getBoundingClientRect().height,
                node: targetElement
            });
        });
        resizeObserver.observe(targetElement);
        return function () {
            resizeObserver.disconnect();
        };
    }, [state.node]);
    return {
        size: state,
        setNode: setNode
    };
}
