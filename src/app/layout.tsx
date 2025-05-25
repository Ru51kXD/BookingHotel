import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from '@/components/ui/ClientWrapper';
import AppProviders from '@/components/providers/AppProviders';
import dynamic from 'next/dynamic';

// Динамический импорт навбара
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { 
  ssr: true,
  loading: () => <div className="h-20 bg-white/90 backdrop-blur-md fixed top-0 w-full z-50" />
});

// Оптимизированный скролл
const OptimizedScroll = dynamic(() => import('@/components/ui/OptimizedScroll'));

// Простой скролл для тестирования
const SimpleScroll = dynamic(() => import('@/components/ui/SimpleScroll'));

// Ультра-плавный скролл
const UltraSmoothScroll = dynamic(() => import('@/components/ui/UltraSmoothScroll'));

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "StayEasy - Мировое бронирование отелей | 100,000+ отелей в 190+ странах",
  description: "Найдите и забронируйте идеальный отель в любой точке мира. Более 100,000 вариантов размещения в 190+ странах с лучшими ценами и гарантией качества.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 antialiased`} suppressHydrationWarning>
        <AppProviders>
          <ClientWrapper />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
