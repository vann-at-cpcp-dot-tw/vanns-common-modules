import { useMemo } from "react"
import { useParams, usePathname } from "next/navigation"

// 為了求取相容性（某些依賴 modules 的其他專案的 import 可能失效）
import { isPathnameStartWithLang } from '~/utils/pathname'
export { isPathnameStartWithLang }


export function usePathnameWithoutLang(){
  const { lang } = useParams()
  const pathname = usePathname()
  const pathnameWithoutLang = useMemo(()=>{
    let result = pathname
    if( isPathnameStartWithLang(pathname, lang as string) ){
      // 如果 pathname 為根節點(首頁)的話，replace 掉 lang 會變空字串，改為 return '/'
      result = pathname.replace(`/${lang}`, '') || '/'
    }
    return result
  }, [pathname, lang])

  return pathnameWithoutLang
}