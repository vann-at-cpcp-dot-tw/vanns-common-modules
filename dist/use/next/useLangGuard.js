import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePathnameWithoutLang } from "../../use/next/usePathnameWithoutLang";
import { useSearchObject } from "../../use/next";
export function tools(i18nConfig) {
    function pathnameWithLang(path, lang) {
        if (lang === i18nConfig.defaultLocale.shortCode) {
            return path;
        }
        return "/".concat(lang).concat(path);
    }
    function convertLocaleCode(lang, to) {
        var target;
        switch (to) {
            case 'short':
                target = i18nConfig.locales.find(function (node) { return node.code === lang; });
                return (target === null || target === void 0 ? void 0 : target.shortCode) || i18nConfig.defaultLocale.shortCode;
            case 'long':
                target = i18nConfig.locales.find(function (node) { return node.shortCode === lang; });
                return (target === null || target === void 0 ? void 0 : target.code) || i18nConfig.defaultLocale.code;
        }
    }
    function isSupportedLang(shortCode) {
        var target = i18nConfig.locales.find(function (node) { return node.shortCode === shortCode; });
        return target ? true : false;
    }
    return {
        pathnameWithLang: pathnameWithLang,
        convertLocaleCode: convertLocaleCode,
        isSupportedLang: isSupportedLang,
    };
}
export function useLangGuard(i18nConfig) {
    var params = useParams();
    var router = useRouter();
    var pathname = usePathnameWithoutLang();
    var searchString = useSearchObject().searchString;
    var lang = params.lang;
    var _a = tools(i18nConfig), convertLocaleCode = _a.convertLocaleCode, pathnameWithLang = _a.pathnameWithLang, isSupportedLang = _a.isSupportedLang;
    var localeCode = convertLocaleCode(lang, 'long');
    useEffect(function () {
        var browserLocaleCode = navigator.language;
        var path = pathname;
        var storedLang = localStorage.getItem('lang');
        var browserLang = convertLocaleCode(browserLocaleCode, 'short') || i18nConfig.defaultLocale.shortCode;
        var targetLang = lang || storedLang || browserLang;
        targetLang = isSupportedLang(targetLang) ? targetLang : i18nConfig.defaultLocale.shortCode;
        var targetPath = pathnameWithLang(path, targetLang);
        if (targetPath) {
            router.push("".concat(targetPath, "?").concat(searchString));
        }
    }, [
        lang,
        pathname,
        router,
    ]);
    return {
        lang: lang,
        localeCode: localeCode,
    };
}
