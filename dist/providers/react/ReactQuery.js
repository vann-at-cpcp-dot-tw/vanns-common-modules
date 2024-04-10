"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from "react";
export function ReactQueryClientProvider(_a) {
    var children = _a.children;
    var queryClient = useState(function () { return new QueryClient(); })[0];
    return _jsx(QueryClientProvider, { client: queryClient, children: children });
}
