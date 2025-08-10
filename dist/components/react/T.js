"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslate } from "../../use/react";
export default function T(props) {
    const { id, className } = props ?? {};
    const { __ } = useTranslate();
    const result = useMemo(() => {
        return __(props.text, props?.vars);
    }, [props.text, props?.vars, __]);
    return _jsx(Suspense, { fallback: null, children: _jsx("span", { className: twMerge('', className), children: typeof result === 'string'
                ? _jsx("span", { dangerouslySetInnerHTML: { __html: __(props.text, props?.vars) || '' } })
                : _jsx("span", { children: __(props.text, props?.vars) }) }) });
}
