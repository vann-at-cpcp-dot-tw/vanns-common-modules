import React, { useCallback, useContext } from "react";
import { isEmpty } from "~/lib/helpers";
import { TranslateContext } from "~/providers/react/Translate";
export function useTranslate() {
    var translationDoc = useContext(TranslateContext);
    var __ = useCallback(function (sourceString, params) {
        if (typeof sourceString !== 'string' && typeof sourceString !== 'number') {
            return sourceString;
        }
        if (isEmpty(translationDoc)) {
            return sourceString;
        }
        if (!translationDoc[sourceString]) {
            return sourceString;
        }
        var translatedString = translationDoc[sourceString];
        if (!Array.isArray(params)) {
            return translatedString;
        }
        var result;
        if (Array.isArray(params)) {
            params.forEach(function (valueNode, i) {
                if (['string', 'number'].includes(typeof valueNode)) {
                    result = translatedString.replaceAll("[s".concat(i + 1, "]"), String(valueNode));
                }
                else if (typeof valueNode === 'object') {
                    var _a = valueNode !== null && valueNode !== void 0 ? valueNode : {}, value = _a.value, className = _a.className, style = _a.style;
                    if (value) {
                        result = translatedString.replaceAll("[s".concat(i + 1, "]"), "<span class=\"".concat(className, "\" style=\"").concat(style, "\">").concat(value, "</span>"));
                        result = <span dangerouslySetInnerHTML={{ __html: result }}></span>;
                    }
                }
            });
        }
        return result;
        // return HtmlReactParser(result)
    }, [translationDoc]);
    return {
        __: __
    };
}
