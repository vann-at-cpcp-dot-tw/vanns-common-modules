import React from 'react';
import { TypeProps } from './LinkWithLang';
export declare const createLinkWithLangComponent: (defaultLang: string) => React.ForwardRefExoticComponent<Omit<TypeProps, "defaultLang"> & React.RefAttributes<HTMLAnchorElement>>;
