'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth';
import { CurrencyProvider } from '@/lib/currency';
import { Toaster } from 'react-hot-toast';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        {children}
        <Toaster position="top-right" />
      </CurrencyProvider>
    </AuthProvider>
  );
} 