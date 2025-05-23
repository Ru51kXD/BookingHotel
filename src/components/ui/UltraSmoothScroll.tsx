'use client';

import { useEffect } from 'react';

interface UltraSmoothScrollProps {
  children: React.ReactNode;
}

export default function UltraSmoothScroll({ children }: UltraSmoothScrollProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isScrolling = false;
    let velocity = 0;
    let targetScroll = window.scrollY;
    
    const smoothness = 0.08; // Коэффициент плавности (чем меньше, тем плавнее)
    const friction = 0.85; // Трение для естественного замедления

    const animate = () => {
      const currentScroll = window.scrollY;
      const distance = targetScroll - currentScroll;
      
      // Плавное движение к цели
      if (Math.abs(distance) > 0.5) {
        const nextScroll = currentScroll + (distance * smoothness);
        window.scrollTo(0, nextScroll);
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, targetScroll);
        isScrolling = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      velocity += delta * 0.3; // Накапливаем скорость
      velocity *= friction; // Применяем трение
      
      targetScroll += velocity;
      
      // Ограничиваем границами страницы
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
      
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(animate);
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return <>{children}</>;
} 