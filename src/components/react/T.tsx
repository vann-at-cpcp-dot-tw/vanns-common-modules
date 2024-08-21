"use client"

import { Suspense, useMemo } from 'react'

import { twMerge } from 'tailwind-merge'
import { useTranslate, IParamNode } from "~/use/react"

interface IProps {
  id?: string
  className?: string
  text: string
  vars?: (IParamNode | string | number)[]
}

export default function T(props:IProps, ref:React.ReactNode){
  const { id, className } = props ?? {}
  const { __ } = useTranslate()
  const result = useMemo(()=>{
    return __(props.text, props?.vars)
  }, [props.text, props?.vars, __])

  return <Suspense fallback={null}>
    <span className={twMerge('', className)}>
      {
        typeof result === 'string'
        ? <span dangerouslySetInnerHTML={{ __html: __(props.text, props?.vars) || '' }}></span>
        : <span>{ __(props.text, props?.vars) }</span>
      }
    </span>
  </Suspense>
}
