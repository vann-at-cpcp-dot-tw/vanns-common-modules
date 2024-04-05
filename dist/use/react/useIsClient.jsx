import useWindowSize from "../../use/react/useWindowSize";
import { useEffect, useState } from "react";
export default function useIsClient() {
    var viewport = useWindowSize();
    var _a = useState(false), isClient = _a[0], setIsClient = _a[1];
    useEffect(function () {
        if (viewport.width && viewport.width > 0) {
            setIsClient(true);
        }
    }, [viewport.width]);
    return isClient;
}
