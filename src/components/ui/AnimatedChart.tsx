'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from '@/lib/motion';
import { BarChart3, PieChart, Activity } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

interface AnimatedChartProps {
  data: ChartData[];
  type?: 'bar' | 'pie' | 'line';
  title?: string;
  className?: string;
}

function AnimatedBar({ 
  data, 
  maxValue, 
  index 
}: { 
  data: ChartData; 
  maxValue: number; 
  index: number;
}) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(data.value);
      }, index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, data.value, index]);

  const heightPercentage = (progress / maxValue) * 100;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Bar */}
      <div className="relative w-16 h-48 bg-gray-200/20 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10">
        <motion.div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${data.color} rounded-lg shadow-lg`}
          initial={{ height: 0 }}
          animate={{ height: `${heightPercentage}%` }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-t ${data.color} blur-sm opacity-50`}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Value display */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2 + 1 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
      
      {/* Label */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.5 }}
      >
        {data.icon && (
          <motion.div
            className="mx-auto mb-2 w-8 h-8 text-white"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {data.icon}
          </motion.div>
        )}
        <p className="text-white text-sm font-medium">{data.label}</p>
      </motion.div>
    </motion.div>
  );
}

function AnimatedPieChart({ data }: { data: ChartData[] }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <motion.div
      ref={ref}
      className="relative w-64 h-64 mx-auto"
      initial={{ scale: 0, rotate: -180 }}
      animate={isInView ? { scale: 1, rotate: 0 } : {}}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg width="256" height="256" className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          const x1 = 128 + 100 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 128 + 100 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 128 + 100 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 128 + 100 * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M 128 128`,
            `L ${x1} ${y1}`,
            `A 100 100 0 ${largeArc} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');
          
          currentAngle += angle;
          
          return (
            <motion.path
              key={index}
              d={pathData}
              className={`${item.color.replace('from-', 'fill-').replace(' to-', '').split(' ')[0]} stroke-white stroke-2`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.05,
                filter: 'brightness(1.2)'
              }}
            />
          );
        })}
      </svg>
      
      {/* Center circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <PieChart className="w-8 h-8 text-white" />
      </motion.div>
    </motion.div>
  );
}

function AnimatedLineChart({ data }: { data: ChartData[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const maxValue = Math.max(...data.map(d => d.value));

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 300;
    const y = 150 - (item.value / maxValue) * 120;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <svg width="300" height="150" className="w-full h-auto">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.line
            key={i}
            x1="0"
            y1={30 * i}
            x2="300"
            y2={30 * i}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
        
        {/* Main line */}
        <motion.polyline
          points={points}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        
        {/* Area under curve */}
        <motion.polygon
          points={`0,150 ${points} 300,150`}
          fill="url(#areaGradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 1 }}
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 300;
          const y = 150 - (item.value / maxValue) * 120;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="6"
              fill="white"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.5, r: 8 }}
            />
          );
        })}
        
        {/* Gradients */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function AnimatedChart({ 
  data, 
  type = 'bar', 
  title = 'Статистика',
  className = '' 
}: AnimatedChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <motion.div
      className={`bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="mr-3 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {type === 'bar' && <BarChart3 className="w-6 h-6 text-white" />}
            {type === 'pie' && <PieChart className="w-6 h-6 text-white" />}
            {type === 'line' && <Activity className="w-6 h-6 text-white" />}
          </motion.div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </motion.div>

      {/* Chart Content */}
      <div className="flex justify-center">
        {type === 'bar' && (
          <div className="flex items-end justify-center space-x-4">
            {data.map((item, index) => (
              <AnimatedBar
                key={index}
                data={item}
                maxValue={maxValue}
                index={index}
              />
            ))}
          </div>
        )}
        
        {type === 'pie' && <AnimatedPieChart data={data} />}
        
        {type === 'line' && <AnimatedLineChart data={data} />}
      </div>

      {/* Legend for pie chart */}
      {type === 'pie' && (
        <motion.div
          className="mt-8 grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-4 h-4 rounded-full mr-2 ${item.color.replace('from-', 'bg-').split(' ')[0]}`} />
              <span className="text-white text-sm">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
} 