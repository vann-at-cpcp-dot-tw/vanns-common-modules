export function isPathnameStartWithLang(path: string, lang: string): boolean {
  const pattern = new RegExp(`^/${lang}(?:/|\\?|$)`)
  return pattern.test(path)
}

export function removeLanguagePrefix(path: string, lang: string): string {
  if (isPathnameStartWithLang(path, lang)) {
    return path.replace(`/${lang}`, '') || '/'
  }
  return path
}