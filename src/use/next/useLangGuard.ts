import { useEffect } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { usePathnameWithoutLang } from "../../use/next/usePathnameWithoutLang"
import { TypeI18n, i18n } from "../../config/next/i18n.config"
import { useSearchObject } from "../../use/next"
import { isPathnameStartWithLang } from "../..//use/next/usePathnameWithoutLang"

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

export function useLangGuard(i18nConfig:TypeI18n, args?:{ withoutQueryString?:boolean }){

  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const pathnameWithoutLang = usePathnameWithoutLang()
  const { searchString } = useSearchObject()
  const { lang } = params
  const { convertLocaleCode, pathnameWithLang, isSupportedLang } = tools(i18nConfig)
  const localeCode = convertLocaleCode((lang as string), 'long')

  useEffect(()=>{
    const browserLocaleCode = navigator.language
    const defaultLang = i18nConfig.defaultLocale.shortCode
    const storedLang = localStorage.getItem('lang')
    const browserLang = convertLocaleCode(browserLocaleCode, 'short') || i18nConfig.defaultLocale.shortCode
    const paramLang = lang
    const langShortCodes = i18nConfig.locales?.map((node)=>node.shortCode)
    const isUrlHasLang = langShortCodes.some((node)=>isPathnameStartWithLang(pathname, node))
    let targetLang

    if( isUrlHasLang ){ // 如果網址有帶 lang，則尊重網址
      targetLang = paramLang
    }else{
      if( storedLang ){
        // 如果網址沒有帶 lang，但是有 storedLang 則看 storedLang 是否支援
        targetLang = isSupportedLang(storedLang) ?storedLang :defaultLang
      }else{
        // 如果網址沒有帶 lang，也沒有 storedLang 則看 browserLang 是否支援
        targetLang = isSupportedLang(browserLang) ?browserLang :defaultLang
      }
    }

    const targetPath = pathnameWithLang(pathnameWithoutLang, targetLang as string)

    if (targetPath) {
      if( args?.withoutQueryString ){
        router.push(`${targetPath}${window.location.hash}`)
      }else{
        router.push(`${targetPath}?${searchString}${window.location?.hash}`)
      }
    }

  }, [])

  return {
    lang,
    localeCode,
  }
}