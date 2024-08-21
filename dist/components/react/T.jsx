"use client";
import { Suspense, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslate } from "../../use/react";
export default function T(props, ref) {
    var _a = props !== null && props !== void 0 ? props : {}, id = _a.id, className = _a.className;
    var __ = useTranslate().__;
    var result = useMemo(function () {
        return __(props.text, props === null || props === void 0 ? void 0 : props.vars);
    }, [props.text, props === null || props === void 0 ? void 0 : props.vars, __]);
    return <Suspense fallback={null}>
    <span className={twMerge('', className)}>
      {typeof result === 'string'
            ? <span dangerouslySetInnerHTML={{ __html: __(props.text, props === null || props === void 0 ? void 0 : props.vars) || '' }}></span>
            : <span>{__(props.text, props === null || props === void 0 ? void 0 : props.vars)}</span>}
    </span>
  </Suspense>;
}
