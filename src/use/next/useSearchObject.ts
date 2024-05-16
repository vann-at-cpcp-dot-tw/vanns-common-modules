import { useCallback, useMemo } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import queryString from "query-string"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"
export function useSearchObject(){
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchString = useMemo(()=>{
    return searchParams.toString()
  }, [searchParams])

  const searchObject = useMemo(()=>{
    return queryString.parse(searchString, {
      arrayFormat: 'comma',
      parseNumbers: true,
    })
  }, [searchString])

  const updateSearch = useCallback((updateQuery:{[key:string]:any}, options?:NavigateOptions)=>{
    const currentSearch = queryString.parse(location.search, {
      arrayFormat: 'comma',
      parseNumbers: true,
    })
    router.push(`
      ${pathname}?${
      queryString.stringify({
        ...currentSearch,
        ...updateQuery,
      }, {arrayFormat: 'comma'})}
    `, options || {})
  }, [router, pathname])

  const historyUpdateSearch = useCallback((updateQuery:{[key:string]:any})=>{
    const currentSearch = queryString.parse(location.search, {
      arrayFormat: 'comma',
      parseNumbers: true,
    })

    history.pushState(null, '', `
      ${pathname}?${
      queryString.stringify({
        ...currentSearch,
        ...updateQuery,
      }, {arrayFormat: 'comma'})}
    `)
  }, [pathname])

  return {
    searchParams,
    searchObject,
    searchString,
    updateSearch,
    historyUpdateSearch
  }
}