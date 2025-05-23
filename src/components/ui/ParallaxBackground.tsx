'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from '@/lib/motion';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function ParallaxBackground({ 
  children, 
  className = '',
  intensity = 0.5 // Сильно уменьшаем интенсивность
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Упрощенный параллакс эффект только для декоративных элементов
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50 * intensity]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100 * intensity]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.2]);

  if (!mounted) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Простые декоративные элементы */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
      >
        {/* Фоновый градиент */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl"
        />
        
        <motion.div
          style={{ y: y2, opacity }}
          className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 blur-2xl"
        />
      </motion.div>

      {/* Основной контент */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 