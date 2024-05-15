import { useCallback, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePathnameWithoutLang } from "~/use/next/usePathnameWithoutLang"
import { TypeI18n } from "~/config/next/i18n.config"
import { useSearchObject } from "~/use/next"

export function tools(i18nConfig:TypeI18n){

  function pathnameWithLang(path:string, lang:string){
    if( lang === i18nConfig.defaultLocale.shortCode ){
      return path
    }
    return `/${lang}${path}`
  }

  function convertLocaleCode(lang:string, to:string){
    let target
    switch(to){
      case 'short':
        target = i18nConfig.locales.find((node)=>node.code === lang)
        return target?.shortCode || i18nConfig.defaultLocale.shortCode
      case 'long':
        target = i18nConfig.locales.find((node)=>node.shortCode === lang)
        return target?.code || i18nConfig.defaultLocale.code
    }
  }

  function isSupportedLang(shortCode:string){
    const target = i18nConfig.locales.find((node)=>node.shortCode === shortCode)
    return target ?true :false
  }

  return {
    pathnameWithLang,
    convertLocaleCode,
    isSupportedLang,
  }
}

export function useLangGuard(i18nConfig:TypeI18n){

  const params = useParams()
  const router = useRouter()
  const pathname = usePathnameWithoutLang()
  const { searchString } = useSearchObject()
  const { lang } = params
  const { convertLocaleCode, pathnameWithLang, isSupportedLang } = tools(i18nConfig)
  const localeCode = convertLocaleCode((lang as string), 'long')

  useEffect(()=>{

    const browserLocaleCode = navigator.language
    const path = pathname
    const storedLang = localStorage.getItem('lang')
    const browserLang = convertLocaleCode(browserLocaleCode, 'short') || i18nConfig.defaultLocale.shortCode
    let targetLang = lang || storedLang || browserLang
    targetLang = isSupportedLang(targetLang as string) ? targetLang : i18nConfig.defaultLocale.shortCode
    const targetPath = pathnameWithLang(path, targetLang as string)
    if (targetPath) {
      router.push(`${targetPath}?${searchString}`)
    }

  }, [
    lang,
    pathname,
    router,
  ])

  return {
    lang,
    localeCode,
  }
}