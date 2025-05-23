'use client';

import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false });

export default function ClientWrapper() {
  return <ScrollProgress />;
} 