"use client"

import { Suspense } from 'react'

import { twMerge } from 'tailwind-merge'
import { useTranslate, IParamNode } from "~/use/react"

interface IProps {
  id?: string
  className?: string
  text: string
  vars?: (IParamNode | string | number)[]
}

export default function Translate(props:IProps, ref:React.ReactNode){
  const { id, className } = props ?? {}
  const { __ } = useTranslate()
  return <Suspense fallback={null}>
    <span className={twMerge('', className)}>{ __(props.text, props?.vars) }</span>
  </Suspense>
}
