'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from '@/lib/motion';

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform-gpu z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
} 