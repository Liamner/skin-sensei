'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Pwa from './Pwa';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <Pwa />
    </NextUIProvider>
  );
}
