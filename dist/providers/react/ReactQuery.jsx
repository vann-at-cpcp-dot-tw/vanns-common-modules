"use client";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from "react";
export function ReactQueryClientProvider(_a) {
    var children = _a.children;
    var queryClient = useState(function () { return new QueryClient(); })[0];
    return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>;
}
