"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export interface TypeProps {
  defaultLang: string // pass short code, eg: zh, en...
  href?: string
  lang?: string | string[]
  children?: React.ReactNode
  [key:string]: any
}

function LinkWithLang(props:TypeProps, ref:React.ReactNode){
  const { href, lang:propsLang, defaultLang, children, ...restProps } = props
  if( !href ){
    return <span {...restProps}>{children}</span>
  }

  const params = useParams()
  const currentLang = params.lang
  const redirectTargetLang = propsLang || currentLang
  const isDefaultLang = redirectTargetLang === defaultLang
  const path = href.includes('http') ?href :isDefaultLang ?href :`/${redirectTargetLang}${href}`

  return <Link href={path} {...restProps}>{children}</Link>
}

export default LinkWithLang