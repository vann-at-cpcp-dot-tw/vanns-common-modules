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
        return isPathnameStartWithLang(pathname, lang) ? pathname.replace("/".concat(lang), '') : pathname;
    }, [pathname, lang]);
    return pathnameWithoutLang;
}
