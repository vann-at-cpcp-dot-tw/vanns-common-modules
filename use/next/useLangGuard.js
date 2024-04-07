import { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePathnameWithoutLang } from "../../src/use/next";
import { i18n } from "../../src/config/next/i18n.config";
export var pathWithLang = function (path, lang) {
    if (lang === i18n.defaultLocale.shortCode) {
        return path;
    }
    return "/".concat(lang).concat(path);
};
export var convertLocaleCode = function (lang, to) {
    var target;
    switch (to) {
        case 'short':
            target = i18n.locales.find(function (node) { return node.code === lang; });
            return (target === null || target === void 0 ? void 0 : target.shortCode) || i18n.defaultLocale.shortCode;
        case 'long':
            target = i18n.locales.find(function (node) { return node.shortCode === lang; });
            return (target === null || target === void 0 ? void 0 : target.code) || i18n.defaultLocale.code;
    }
};
export var isSupportedLang = function (shortCode) {
    var target = i18n.locales.find(function (node) { return node.shortCode === shortCode; });
    return target ? true : false;
};
export function useLangGuard() {
    var params = useParams();
    var router = useRouter();
    var pathname = usePathnameWithoutLang();
    var lang = params.lang;
    var localeCode = convertLocaleCode(lang, 'long');
    var determineTargetPath = useCallback(function (storedLang, browserLang, path) {
        // 如果 localStorage 有儲存 lang
        if (storedLang) {
            // 如果儲存的 lang 和 URL 不匹配，則回傳 storedLang 或 default lang
            if (storedLang !== lang) {
                return pathWithLang(path, isSupportedLang(storedLang) ? storedLang : i18n.defaultLocale.shortCode);
            }
            // 如果 localStorage 沒有儲存 lang，但瀏覽器的 lang 在 JGB 語言支援列表中，則自動將瀏覽器語言儲存至 localStorage 後，回傳 browserLang
        }
        else if (isSupportedLang(browserLang)) {
            localStorage.setItem('lang', browserLang);
            return pathWithLang(path, browserLang);
            // 如果 localStorage 沒有儲存 lang，且瀏覽器的 lang 又不在 JGB 支援的語言列表中，則回傳 default lang
        }
        else {
            return pathWithLang(path, i18n.defaultLocale.shortCode);
        }
    }, [lang]);
    useEffect(function () {
        var browserLocaleCode = navigator.language;
        var path = pathname;
        var storedLang = localStorage.getItem('lang');
        var browserLang = convertLocaleCode(browserLocaleCode, 'short') || i18n.defaultLocale.shortCode;
        var targetPath = determineTargetPath(storedLang, browserLang, path);
        if (targetPath) {
            router.push(targetPath);
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
