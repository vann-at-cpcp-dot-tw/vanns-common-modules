import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
export default function RatioArea(props) {
    return (_jsxs("div", { className: twMerge('ratioArea relative w-full', props === null || props === void 0 ? void 0 : props.className), children: [_jsx("div", { className: "fill pointer-events-none relative", style: {
                    width: '100%',
                    paddingBottom: "".concat(props.ratio, "%")
                } }), props.children] }));
}
