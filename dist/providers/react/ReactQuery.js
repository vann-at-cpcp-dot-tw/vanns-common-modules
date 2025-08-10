"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";
export function ReactQueryClientProvider({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    return _jsx(QueryClientProvider, { client: queryClient, children: children });
}
