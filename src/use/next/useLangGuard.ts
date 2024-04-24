import { useCallback, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePathnameWithoutLang } from "~/use/next/usePathnameWithoutLang"
import { TypeI18n } from "~/config/next/i18n.config"

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
  const { lang } = params
  const { convertLocaleCode, pathnameWithLang, isSupportedLang } = tools(i18nConfig)
  const localeCode = convertLocaleCode((lang as string), 'long')
  const determineTargetPath = useCallback((storedLang:string | null, browserLang:string, path:string)=>{
    // 語言優先度： URL夾帶 > localStorage 儲存 > browser lang > default lang

    // 如果 URL 有傳 lang，且不等於 default lang（網址有明確夾帶 lang）的情況...
    if( lang && typeof lang === 'string' && lang !== i18nConfig.defaultLocale.shortCode ){

      let targetLang = i18nConfig.defaultLocale.shortCode

      if( isSupportedLang(lang) ){
        targetLang = lang
      }else if( storedLang && isSupportedLang(storedLang) ){
        targetLang = storedLang
      }

      return pathnameWithLang(path, targetLang)
    }

    // 如果 localStorage 有儲存 lang
    if (storedLang ) {

      // 如果儲存的 lang 和 URL 不匹配，則回傳 storedLang 或 default lang
      if( storedLang !== lang ){
        return pathnameWithLang(path, isSupportedLang(storedLang) ? storedLang : i18nConfig.defaultLocale.shortCode)
      }

    // 如果 localStorage 沒有儲存 lang，但瀏覽器的 lang 在網站支援的語言列表中，則自動將瀏覽器語言儲存至 localStorage 後，回傳 browserLang
    } else if (isSupportedLang(browserLang)) {

      localStorage.setItem('lang', browserLang)
      return pathnameWithLang(path, browserLang)

    // 如果 localStorage 沒有儲存 lang，且瀏覽器的 lang 又不在網站支援的語言列表中，則回傳 default lang
    } else {
      localStorage.setItem('lang', i18nConfig.defaultLocale.shortCode)
      return pathnameWithLang(path, i18nConfig.defaultLocale.shortCode)
    }
  }, [lang])

  useEffect(()=>{

    const browserLocaleCode = navigator.language
    const path = pathname
    const storedLang = localStorage.getItem('lang')
    const browserLang = convertLocaleCode(browserLocaleCode, 'short') || i18nConfig.defaultLocale.shortCode
    const targetPath = determineTargetPath(storedLang, browserLang, path)

    if (targetPath) {
      router.push(targetPath)
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