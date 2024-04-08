"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
const i18n = require(process.env.I18N_CONFIG_PATH || '')

interface TypeProps {
  href?: string
  lang: string | string[]
  children: React.ReactNode
  [key:string]: any
}

function LinkWithLang(props:TypeProps, ref:React.ReactNode){
  const { href, lang:propsLang, ...restProps } = props
  if( !href ){
    return <span {...restProps}>{}</span>
  }
  const params = useParams()
  const currentLang = params.lang
  const redirectTargetLang = propsLang || currentLang
  const isDefaultLang = redirectTargetLang === i18n.defaultLocale.shortCode
  const path = isDefaultLang ?href :`/${redirectTargetLang}${href}`
  return <Link href={path} {...restProps}>{}</Link>
}

export default LinkWithLang