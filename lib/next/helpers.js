import { i18n } from '@root/i18n.config'

export const pathnameWithLang = function(pathname, lang){
  const isDefaultLang = lang === i18n.defaultLocale
  const path = isDefaultLang ?pathname :`/${lang}${pathname}`
  return path
}