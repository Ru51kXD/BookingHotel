'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from '@/lib/motion';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function ParallaxBackground({ 
  children, 
  className = '',
  intensity = 1 
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  
  // Убеждаемся что компонент примонтирован на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Параллакс эффекты с разной интенсивностью
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100 * intensity]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200 * intensity]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 300 * intensity]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Плавные анимации
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 80, damping: 25 });
  const smoothY3 = useSpring(y3, { stiffness: 60, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 30 });

  // 3D эффект при движении мыши
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // Создаем хуки для элементов отдельно
  const floatingY0 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const floatingY4 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const floatingY5 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const lineY0 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const lineY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const lineY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const lineOpacity0 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.2, 0]);
  const lineOpacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.2, 0]);
  const lineOpacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.2, 0]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !mounted) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  // Массивы данных для элементов (без хуков)
  const floatingElements = [
    { id: 0, left: '20%', top: '30%', yTransform: floatingY0, duration: 3, delay: 0 },
    { id: 1, left: '35%', top: '40%', yTransform: floatingY1, duration: 4, delay: 0.5 },
    { id: 2, left: '50%', top: '50%', yTransform: floatingY2, duration: 5, delay: 1 },
    { id: 3, left: '65%', top: '60%', yTransform: floatingY3, duration: 6, delay: 1.5 },
    { id: 4, left: '80%', top: '70%', yTransform: floatingY4, duration: 7, delay: 2 },
    { id: 5, left: '95%', top: '80%', yTransform: floatingY5, duration: 8, delay: 2.5 }
  ];

  const perspectiveLines = [
    { id: 0, left: '25%', yTransform: lineY0, opacityTransform: lineOpacity0 },
    { id: 1, left: '50%', yTransform: lineY1, opacityTransform: lineOpacity1 },
    { id: 2, left: '75%', yTransform: lineY2, opacityTransform: lineOpacity2 }
  ];

  // Не рендерим сложные анимации на сервере
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
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      {/* Анимированные геометрические фигуры */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Слой 1 - Самый дальний */}
        <motion.div
          style={{ y: smoothY3, opacity: 0.3 }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Слой 2 - Средний */}
        <motion.div
          style={{ y: smoothY2, opacity: 0.4 }}
          className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full"
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/25 to-teal-500/25 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Слой 3 - Ближний */}
        <motion.div
          style={{ y: smoothY1, opacity: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-xl"
            style={{ rotate: smoothRotate }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Дополнительные плавающие элементы */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-4 h-4 rounded-full bg-white/20"
            style={{
              left: element.left,
              top: element.top,
              y: element.yTransform
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay
            }}
          />
        ))}

        {/* Волновой эффект */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent"
          style={{
            y: smoothY1,
            opacity
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              backgroundSize: '200% 100%'
            }}
          />
        </motion.div>

        {/* Сетка точек */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y: smoothY2 }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </motion.div>

        {/* Линии перспективы */}
        {perspectiveLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute top-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent h-full"
            style={{
              left: line.left,
              y: line.yTransform,
              opacity: line.opacityTransform
            }}
          />
        ))}
      </motion.div>

      {/* Контент */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Интерактивные частицы */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(79, 70, 229, 0.1), transparent 40%)`
        }}
      />
    </div>
  );
} 