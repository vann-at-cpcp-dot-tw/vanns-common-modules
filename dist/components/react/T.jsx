"use client";
import { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslate } from "../../use/react";
export default function Translate(props, ref) {
    var _a = props !== null && props !== void 0 ? props : {}, id = _a.id, className = _a.className;
    var __ = useTranslate().__;
    return <Suspense fallback={null}>
    <span className={twMerge('', className)}>{__(props.text, props === null || props === void 0 ? void 0 : props.vars)}</span>
  </Suspense>;
}
