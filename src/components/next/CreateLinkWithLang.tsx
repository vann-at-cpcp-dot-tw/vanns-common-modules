import React from 'react';

// 原始的 LinkWithLang 組件
import LinkWithLang, { TypeProps } from './LinkWithLang';

// 創建一個高階組件工廠函數
const createLinkWithLangComponent = (defaultLang: string) => {
  const WrappedLinkWithLang = React.forwardRef<HTMLAnchorElement, Omit<TypeProps, 'defaultLang'>>((props, ref) => {
    return <LinkWithLang {...props} defaultLang={defaultLang} ref={ref} />;
  })

  WrappedLinkWithLang.displayName = 'WrappedLinkWithLang'

  return WrappedLinkWithLang
}

export default createLinkWithLangComponent;