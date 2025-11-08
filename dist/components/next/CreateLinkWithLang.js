import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Factory function to create a LinkWithLang component with pre-configured defaultLang.
 *
 * This avoids passing `defaultLang` prop on every usage, providing a cleaner API
 * while maintaining zero runtime overhead and full Server Components compatibility.
 *
 * @param defaultLang - The default language code (e.g., 'en', 'zh', 'ja')
 * @returns A configured LinkWithLang component that doesn't require `defaultLang` prop
 *
 * @example
 * ```tsx
 * // Step 1: Create a wrapper component in your project
 * // File: src/components/custom/LinkWithLang.tsx
 *
 * "use client"
 * import { createLinkWithLangComponent } from "vanns-common-modules/dist/components/next/CreateLinkWithLang"
 * import { i18n } from '~/i18n.config'
 *
 * const LinkWithLang = createLinkWithLangComponent(i18n.defaultLocale.shortCode)
 * export default LinkWithLang
 *
 * // Step 2: Use it across your project
 * // File: src/app/[lang]/page.tsx
 *
 * import LinkWithLang from '~/components/custom/LinkWithLang'
 *
 * export default function Page() {
 *   return (
 *     <nav>
 *       <LinkWithLang href="/">Home</LinkWithLang>
 *       <LinkWithLang href="/about">About</LinkWithLang>
 *       <LinkWithLang href="/contact" lang="zh">聯絡我們</LinkWithLang>
 *     </nav>
 *   )
 * }
 * ```
 *
 * @remarks
 * ## Design Rationale
 *
 * This factory pattern is used instead of React Context for several reasons:
 *
 * 1. **Build-time Configuration**: `defaultLang` is determined at build time and never changes.
 *    Using runtime mechanisms (Context/Props) would be unnecessary overhead.
 *
 * 2. **Zero Runtime Cost**: The factory function runs once during module initialization.
 *    No context lookups, no unnecessary re-renders.
 *
 * 3. **Server Components Compatible**: React Context is client-only. This pattern works
 *    seamlessly in both Server Components and Client Components.
 *
 * 4. **Type Safety**: TypeScript can fully type-check the configuration at compile time.
 *    Missing configuration results in build errors, not runtime errors.
 *
 * 5. **Simplicity**: No additional Provider setup required in the component tree.
 *    Just create once, use everywhere.
 */
import React from 'react';
import LinkWithLang from './LinkWithLang';
export const createLinkWithLangComponent = (defaultLang) => {
    const WrappedLinkWithLang = React.forwardRef((props, ref) => {
        return _jsx(LinkWithLang, { ...props, defaultLang: defaultLang, ref: ref });
    });
    WrappedLinkWithLang.displayName = 'WrappedLinkWithLang';
    return WrappedLinkWithLang;
};
