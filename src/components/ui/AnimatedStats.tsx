'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from '@/lib/motion';
import { TrendingUp, Users, MapPin, Award, Clock, Shield } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  color: string;
  delay: number;
}

interface AnimatedStatsProps {
  className?: string;
}

const statsData: StatItem[] = [
  {
    icon: <MapPin className="w-8 h-8" />,
    value: 50000,
    label: 'Отелей по всему миру',
    suffix: '+',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 2500000,
    label: 'Довольных клиентов',
    suffix: '+',
    color: 'from-green-500 to-emerald-500',
    delay: 0.2
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 4.9,
    label: 'Средний рейтинг',
    suffix: '/5',
    color: 'from-yellow-500 to-orange-500',
    delay: 0.4
  },
  {
    icon: <Clock className="w-8 h-8" />,
    value: 24,
    label: 'Поддержка 24/7',
    suffix: '/7',
    color: 'from-purple-500 to-pink-500',
    delay: 0.6
  },
  {
    icon: <Shield className="w-8 h-8" />,
    value: 100,
    label: 'Безопасность',
    suffix: '%',
    color: 'from-indigo-500 to-blue-500',
    delay: 0.8
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: 99.9,
    label: 'Время работы',
    suffix: '%',
    color: 'from-rose-500 to-pink-500',
    delay: 1.0
  }
];

function AnimatedCounter({ 
  value, 
  suffix = '', 
  duration = 2,
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const timeout = setTimeout(() => {
        const increment = value / (duration * 60); // 60 FPS
        const timer = setInterval(() => {
          setCount(prev => {
            const next = prev + increment;
            if (next >= value) {
              clearInterval(timer);
              return value;
            }
            return next;
          });
        }, 1000 / 60);

        return () => clearInterval(timer);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, duration, delay, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return Math.floor(num).toString();
  };

  return (
    <span ref={ref}>
      {value > 1000 ? formatNumber(count) : count.toFixed(value % 1 !== 0 ? 1 : 0)}
      {suffix}
    </span>
  );
}

export default function AnimatedStats({ className = '' }: AnimatedStatsProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.section
      ref={containerRef}
      style={{ y: smoothY, opacity, scale: smoothScale }}
      className={`py-20 relative overflow-hidden ${className}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Анимированные частицы фона */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`floating-particle-${i}`}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Background Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`bg-particle-${i}`}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.5, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            whileInView={{ 
              backgroundImage: [
                'linear-gradient(45deg, #ffffff, #e0e7ff)',
                'linear-gradient(45deg, #a5b4fc, #c084fc)',
                'linear-gradient(45deg, #ffffff, #e0e7ff)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Наши достижения в цифрах
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Статистика, которая говорит о нашем качестве и надежности
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={`stat-card-${index}`}
              initial={{ opacity: 0, y: 100, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: stat.delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
              className="group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                
                {/* Animated Border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Icon with 3D effect */}
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6 relative`}
                  whileHover={{ 
                    scale: 1.2,
                    rotateY: 180,
                    rotateZ: 360
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Animated Number */}
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  whileInView={{ 
                    textShadow: [
                      '0 0 0px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.8)',
                      '0 0 0px rgba(255,255,255,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    delay={stat.delay}
                  />
                </motion.div>

                <motion.p 
                  className="text-white/80 text-lg font-medium"
                  whileHover={{ color: '#ffffff' }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.label}
                </motion.p>

                {/* Animated Progress Bar */}
                <motion.div 
                  className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: stat.delay + 0.5 }}
                >
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: stat.delay + 1 }}
                  />
                </motion.div>

                {/* Интерактивные частицы */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`stats-particle-${index}-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [-10, -30, -10],
                        opacity: [0, 0.6, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Wave Animation */}
        <motion.div 
          className="mt-20 relative h-32 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="absolute bottom-0 left-0 w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              backgroundSize: '200% 100%'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
} 