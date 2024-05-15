import { useMemo } from "react"
import { useParams, usePathname } from "next/navigation"

function isPathStartingWithLang(path:string, lang:string) {
  const pattern = new RegExp(`^/${lang}(?:/|\\?|$)`);
  return pattern.test(path);
}

export function usePathnameWithoutLang(){
  const { lang } = useParams()
  const pathname = usePathname()
  const pathnameWithoutLang = useMemo(()=>{
    return isPathStartingWithLang(pathname, lang as string) ?pathname.replace(`/${lang}`, '') :pathname
  }, [pathname, lang])

  return pathnameWithoutLang
}