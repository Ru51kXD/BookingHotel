'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { X, Mail, Lock, Eye, EyeOff, Loader, CheckCircle, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login({ email, password });
      if (result.success) {
        setUserName(result.user?.name || 'Пользователь');
        setIsSuccess(true);
        setEmail('');
        setPassword('');
        
        // Автоматически закрываем модальное окно через 2.5 секунды
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setError(result.error || 'Ошибка входа');
      }
    } catch (error) {
      setError('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setUserName('');
    onClose();
  };

  const goToAccount = () => {
    handleClose();
    // Используем Next.js router для навигации
    router.push('/account');
  };

  const goToHotels = () => {
    handleClose();
    router.push('/hotels');
  };

  const goToDestinations = () => {
    handleClose();
    router.push('/destinations');
  };

  // Экран успешного входа
  const renderSuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      {/* Анимированная иконка успеха */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 10 
        }}
        className="relative mx-auto mb-6"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto relative">
          <CheckCircle className="w-12 h-12 text-white" />
          
          {/* Пульсирующий эффект */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"
          />
          
          {/* Летающие сердечки */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.cos(i * 72 * Math.PI / 180) * 50],
                y: [0, Math.sin(i * 72 * Math.PI / 180) * 50]
              }}
              transition={{
                duration: 2,
                delay: 0.5 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-8px',
                marginTop: '-8px'
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Заголовок */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-gray-900 mb-4"
      >
        🎉 Добро пожаловать!
      </motion.h2>

      {/* Персональное приветствие */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <p className="text-gray-600 text-lg mb-2">
          Привет, <span className="font-semibold text-blue-600">{userName}!</span> ✨
        </p>
        <p className="text-gray-500">
          Вы успешно вошли в систему. Готовы к новым путешествиям?
        </p>
      </motion.div>

      {/* Быстрые действия */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 cursor-pointer"
            onClick={goToHotels}
          >
            <Sparkles className="w-6 h-6 text-blue-600" />
          </motion.div>
          <p className="text-sm text-gray-600">Найти<br />отели</p>
        </div>
        <div className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2 cursor-pointer"
            onClick={goToAccount}
          >
            <CheckCircle className="w-6 h-6 text-green-600" />
          </motion.div>
          <p className="text-sm text-gray-600">Личный<br />кабинет</p>
        </div>
        <div className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 cursor-pointer"
            onClick={goToDestinations}
          >
            <Heart className="w-6 h-6 text-purple-600" />
          </motion.div>
          <p className="text-sm text-gray-600">Направления<br />отдыха</p>
        </div>
      </motion.div>

      {/* Кнопки */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={goToAccount}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center"
        >
          <span>Перейти в личный кабинет</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClose}
          className="w-full border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
        >
          Продолжить просмотр
        </motion.button>
      </motion.div>

      {/* Автозакрытие */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <p className="text-xs text-gray-400">
          Окно автоматически закроется через несколько секунд
        </p>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="h-1 bg-blue-500 rounded-full mt-2"
        />
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </motion.button>

              {isSuccess ? renderSuccessScreen() : (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать!</h2>
                    <p className="text-gray-600">Войдите в свой аккаунт</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Пароль
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-5 h-5 mr-2 animate-spin" />
                          Вход...
                        </>
                      ) : (
                        'Войти'
                      )}
                    </motion.button>
                  </form>

                  {/* Footer */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-600">
                      Нет аккаунта?{' '}
                      <button
                        onClick={onSwitchToRegister}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Зарегистрируйтесь
                      </button>
                    </p>
                  </div>

                  {/* Demo Account */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-blue-800 text-sm text-center">
                      <strong>Демо-аккаунт:</strong><br />
                      Email: demo@example.com<br />
                      Пароль: demo123
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 