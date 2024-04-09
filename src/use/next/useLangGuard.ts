import { useCallback, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePathnameWithoutLang } from "~/use/next/usePathnameWithoutLang"
import { TypeI18n } from "~/config/next/i18n.config"

export function tools(i18nConfig:TypeI18n){
  return {
    pathWithLang: (path:string, lang:string)=>{
      if( lang === i18nConfig.defaultLocale.shortCode ){
        return path
      }
      return `/${lang}${path}`
    },
    convertLocaleCode: (lang:string, to:string)=>{
       let target
        switch(to){
          case 'short':
            target = i18nConfig.locales.find((node)=>node.code === lang)
            return target?.shortCode || i18nConfig.defaultLocale.shortCode
          case 'long':
            target = i18nConfig.locales.find((node)=>node.shortCode === lang)
            return target?.code || i18nConfig.defaultLocale.code
        }
    },
    isSupportedLang: (shortCode:string)=>{
      const target = i18nConfig.locales.find((node)=>node.shortCode === shortCode)
      return target ?true :false
    }
  }
}

export function useLangGuard(i18nConfig:TypeI18n){

  const params = useParams()
  const router = useRouter()
  const pathname = usePathnameWithoutLang()
  const { lang } = params
  const { convertLocaleCode, pathWithLang, isSupportedLang } = tools(i18nConfig)
  const localeCode = convertLocaleCode((lang as string), 'long')
  const determineTargetPath = useCallback((storedLang:string | null, browserLang:string, path:string)=>{

    // 如果 localStorage 有儲存 lang
    if (storedLang ) {

      // 如果儲存的 lang 和 URL 不匹配，則回傳 storedLang 或 default lang
      if( storedLang !== lang ){
        return pathWithLang(path, isSupportedLang(storedLang) ? storedLang : i18nConfig.defaultLocale.shortCode)
      }

    // 如果 localStorage 沒有儲存 lang，但瀏覽器的 lang 在 JGB 語言支援列表中，則自動將瀏覽器語言儲存至 localStorage 後，回傳 browserLang
    } else if (isSupportedLang(browserLang)) {

      localStorage.setItem('lang', browserLang)
      return pathWithLang(path, browserLang)

    // 如果 localStorage 沒有儲存 lang，且瀏覽器的 lang 又不在 JGB 支援的語言列表中，則回傳 default lang
    } else {
      return pathWithLang(path, i18nConfig.defaultLocale.shortCode)
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