import React from 'react'

import LinkWithLang, { TypeProps } from './LinkWithLang'

export const createLinkWithLangComponent = (defaultLang: string) => {
  const WrappedLinkWithLang = React.forwardRef<HTMLAnchorElement, Omit<TypeProps, 'defaultLang'>>((props, ref) => {
    return <LinkWithLang {...props} defaultLang={defaultLang} ref={ref} />;
  })

  WrappedLinkWithLang.displayName = 'WrappedLinkWithLang'

  return WrappedLinkWithLang
}
