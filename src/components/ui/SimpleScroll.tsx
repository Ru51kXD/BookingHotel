'use client';

import { useEffect } from 'react';

interface SimpleScrollProps {
  children: React.ReactNode;
}

export default function SimpleScroll({ children }: SimpleScrollProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Переопределяем стандартное поведение скролла
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      
      // Плавная отзывчивая прокрутка
      window.scrollBy({
        top: delta * 2.0, // Сохраняем стандартную скорость прокрутки
        behavior: 'smooth' // Плавная анимация
      });
    };

    // Добавляем обработчик
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return <>{children}</>;
} 