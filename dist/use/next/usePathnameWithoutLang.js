import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
export function isPathnameStartWithLang(path, lang) {
    var pattern = new RegExp("^/".concat(lang, "(?:/|\\?|$)"));
    return pattern.test(path);
}
export function usePathnameWithoutLang() {
    var lang = useParams().lang;
    var pathname = usePathname();
    var pathnameWithoutLang = useMemo(function () {
        var result = pathname;
        if (isPathnameStartWithLang(pathname, lang)) {
            // 如果 pathname 為根節點(首頁)的話，replace 掉 lang 會變空字串，改為 return '/'
            result = pathname.replace("/".concat(lang), '') || '/';
        }
        return result;
    }, [pathname, lang]);
    return pathnameWithoutLang;
}
