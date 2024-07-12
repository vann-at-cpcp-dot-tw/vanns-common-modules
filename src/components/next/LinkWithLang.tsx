// "use client"

// import Link, { LinkProps } from "next/link"
// import { useParams } from "next/navigation"

// export type TypeProps = LinkProps & {
//   defaultLang: string // pass short code, eg: zh, en...
//   lang?: string | string[]
//   children?: React.ReactNode
// }



// function LinkWithLang(props:TypeProps, ref:React.ReactNode){
//   const { href:propsHref, lang:propsLang, defaultLang, children, ...restProps } = props
//   if( !propsHref ){
//     return <span {...restProps}>{children}</span>
//   }

//   const params = useParams()
//   const currentLang = params.lang
//   const redirectTargetLang = propsLang || currentLang
//   const isDefaultLang = redirectTargetLang === defaultLang

//   let href = propsHref
//   if( typeof propsHref === 'string'){
//     href = propsHref.includes('http') ?propsHref :isDefaultLang ?propsHref :`/${redirectTargetLang}${propsHref}`
//   }

//   return <Link href={href} {...restProps}>{children}</Link>
// }

// export default LinkWithLang

"use client"

import React from "react"
import Link, { LinkProps } from "next/link"
import { useParams } from "next/navigation"

export type TypeProps = LinkProps & {
  defaultLang: string // pass short code, eg: zh, en...
  lang?: string | string[]
  children?: React.ReactNode
}

const LinkWithLang = React.forwardRef<HTMLAnchorElement, TypeProps>((props, ref) => {
  const { href: propsHref, lang: propsLang, defaultLang, children, ...restProps } = props
  if (!propsHref) {
    return <span {...restProps}>{children}</span>
  }
  const params = useParams()
  const currentLang = params.lang
  const redirectTargetLang = propsLang || currentLang
  const isDefaultLang = redirectTargetLang === defaultLang
  let href = propsHref
  if (typeof propsHref === 'string') {
    href = propsHref.includes('http') ? propsHref : isDefaultLang ? propsHref : `/${redirectTargetLang}${propsHref}`
  }
  return <Link href={href} {...restProps} ref={ref}>{children}</Link>
})

LinkWithLang.displayName = 'LinkWithLang'

export default LinkWithLang