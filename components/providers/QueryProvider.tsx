'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { query } from '@/lib/query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={ query }>
      { children }
    </QueryClientProvider>
  );
}
