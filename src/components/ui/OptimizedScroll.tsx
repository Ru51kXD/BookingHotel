'use client';

import { useEffect } from 'react';

interface OptimizedScrollProps {
  children: React.ReactNode;
}

export default function OptimizedScroll({ children }: OptimizedScrollProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isScrolling = false;
    let currentTarget = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      
      // Если уже скроллим, накапливаем цель для еще более плавного ощущения
      if (isScrolling) {
        currentTarget += delta * 1.8;
        return;
      }
      
      isScrolling = true;
      const currentScrollY = window.scrollY;
      currentTarget = currentScrollY + (delta * 1.8);
      
      // Очень плавная прокрутка с requestAnimationFrame
      const startTime = performance.now();
      const duration = 300; // Увеличенная длительность для максимальной плавности
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Супер плавная easing функция (ease-in-out cubic)
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const scrollY = currentScrollY + (currentTarget - currentScrollY) * easeProgress;
        window.scrollTo(0, scrollY);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          isScrolling = false;
        }
      };
      
      requestAnimationFrame(animateScroll);
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return <>{children}</>;
} 