'use client';

import { motion, AnimatePresence } from '@/lib/motion';
import { CheckCircle, Gift, Send, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SuccessAnimationProps {
  isVisible: boolean;
  onClose: () => void;
  type: 'gift-card' | 'application' | 'offer';
  title: string;
  message: string;
  details?: string;
  autoCloseDelay?: number;
}

export default function SuccessAnimation({
  isVisible,
  onClose,
  type,
  title,
  message,
  details,
  autoCloseDelay = 4000
}: SuccessAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onClose, 500);
            return 100;
          }
          return prev + (100 / (autoCloseDelay / 100));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVisible, autoCloseDelay, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'gift-card':
        return <Gift className="w-16 h-16 text-white" />;
      case 'application':
        return <Send className="w-16 h-16 text-white" />;
      case 'offer':
        return <ShoppingCart className="w-16 h-16 text-white" />;
      default:
        return <CheckCircle className="w-16 h-16 text-white" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'gift-card':
        return 'from-purple-500 to-pink-600';
      case 'application':
        return 'from-blue-500 to-indigo-600';
      case 'offer':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  // Конфетти анимация
  const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    x: Math.random() * 100,
    rotation: Math.random() * 360,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          {/* Конфетти */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={`confetti-${piece.id}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: '-10px',
              }}
              initial={{ y: -100, rotate: 0, opacity: 1 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: piece.rotation,
                opacity: 0,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Основная карточка */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Заголовок с иконкой */}
            <div className={`bg-gradient-to-r ${getGradient()} p-8 text-center relative overflow-hidden`}>
              {/* Блестящие звезды */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`success-star-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: Math.random() * 2,
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: Math.random() * 3,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white/30" />
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="relative z-10"
              >
                {getIcon()}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-white mt-4"
              >
                {title}
              </motion.h2>
            </div>

            {/* Контент */}
            <div className="p-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 text-center mb-4 text-lg"
              >
                {message}
              </motion.p>

              {details && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-50 rounded-xl p-4 mb-6"
                >
                  <p className="text-gray-700 text-center font-mono text-sm">
                    {details}
                  </p>
                </motion.div>
              )}

              {/* Прогресс бар */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Автоматическое закрытие</span>
                  <span>{Math.ceil((100 - progress) / 25)}с</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${getGradient()} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>

              {/* Кнопки */}
              <div className="flex gap-3">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Закрыть
                </motion.button>
                
                {type === 'gift-card' && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/my-cards'}
                    className={`flex-1 bg-gradient-to-r ${getGradient()} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
                  >
                    Мои сертификаты
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 