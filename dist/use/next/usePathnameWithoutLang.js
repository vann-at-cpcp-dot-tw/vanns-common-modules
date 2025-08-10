"use client";
import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
export function isPathnameStartWithLang(path, lang) {
    const pattern = new RegExp(`^/${lang}(?:/|\\?|$)`);
    return pattern.test(path);
}
export function usePathnameWithoutLang() {
    const { lang } = useParams();
    const pathname = usePathname();
    const pathnameWithoutLang = useMemo(() => {
        let result = pathname;
        if (isPathnameStartWithLang(pathname, lang)) {
            // 如果 pathname 為根節點(首頁)的話，replace 掉 lang 會變空字串，改為 return '/'
            result = pathname.replace(`/${lang}`, '') || '/';
        }
        return result;
    }, [pathname, lang]);
    return pathnameWithoutLang;
}
