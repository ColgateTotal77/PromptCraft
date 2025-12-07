'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import React from 'react';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
