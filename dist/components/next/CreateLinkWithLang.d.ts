import React from 'react';
import { TypeProps } from './LinkWithLang';
export declare const createLinkWithLangComponent: (defaultLang: string) => React.ForwardRefExoticComponent<Omit<Omit<TypeProps, "defaultLang">, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
