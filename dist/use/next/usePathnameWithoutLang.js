import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
export function usePathnameWithoutLang() {
    var lang = useParams().lang;
    var pathname = usePathname();
    var pathnameWithoutLang = useMemo(function () {
        return pathname.startsWith("/".concat(lang, "/")) ? pathname.replace("/".concat(lang), '') : pathname;
    }, [pathname, lang]);
    return pathnameWithoutLang;
}
