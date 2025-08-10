import React, { useCallback, useContext } from "react";
import { isEmpty } from "../../lib/helpers";
import { TranslateContext } from "../../providers/react/Translate";
export function useTranslate() {
    const translationDoc = useContext(TranslateContext);
    const __ = useCallback((sourceString, params) => {
        if (typeof sourceString !== 'string' && typeof sourceString !== 'number') {
            return sourceString;
        }
        if (isEmpty(translationDoc)) {
            return sourceString;
        }
        if (!translationDoc[sourceString]) {
            return sourceString;
        }
        let translatedString = translationDoc[sourceString];
        if (!Array.isArray(params)) {
            return translatedString;
        }
        let result;
        if (Array.isArray(params)) {
            params.forEach((valueNode, i) => {
                if (['string', 'number'].includes(typeof valueNode)) {
                    result = translatedString.replaceAll(`[s${i + 1}]`, String(valueNode));
                }
                else if (typeof valueNode === 'object') {
                    const { value, className, style } = valueNode ?? {};
                    if (value) {
                        result = translatedString.replaceAll(`[s${i + 1}]`, `<span class="${className}" style="${style}">${value}</span>`);
                        result = <span dangerouslySetInnerHTML={{ __html: result }}></span>;
                    }
                }
            });
        }
        return result;
        // return HtmlReactParser(result)
    }, [translationDoc]);
    return {
        __
    };
}
