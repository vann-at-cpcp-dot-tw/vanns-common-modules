export function isPathnameStartWithLang(path, lang) {
    const pattern = new RegExp(`^/${lang}(?:/|\\?|$)`);
    return pattern.test(path);
}
export function removeLanguagePrefix(path, lang) {
    if (isPathnameStartWithLang(path, lang)) {
        return path.replace(`/${lang}`, '') || '/';
    }
    return path;
}
