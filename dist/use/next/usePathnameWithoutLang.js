import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
function isPathStartingWithLang(path, lang) {
    var pattern = new RegExp("^/".concat(lang, "(?:/|\\?|$)"));
    return pattern.test(path);
}
export function usePathnameWithoutLang() {
    var lang = useParams().lang;
    var pathname = usePathname();
    var pathnameWithoutLang = useMemo(function () {
        return isPathStartingWithLang(pathname, lang) ? pathname.replace("/".concat(lang), '') : pathname;
    }, [pathname, lang]);
    return pathnameWithoutLang;
}
