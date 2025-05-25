'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth';
import { CurrencyProvider } from '@/lib/currency';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </AuthProvider>
  );
} 