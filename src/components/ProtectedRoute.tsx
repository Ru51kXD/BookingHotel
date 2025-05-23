'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { motion } from '@/lib/motion';
import { Shield, Lock, UserPlus, LogIn } from 'lucide-react';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Если загружается - показываем loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Загрузка...</p>
        </motion.div>
      </div>
    );
  }

  // Если требуется авторизация и пользователь не авторизован
  if (requireAuth && !user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            {/* Иконка безопасности */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>

            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Доступ ограничен
            </motion.h1>

            {/* Описание */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              Для использования нашего сервиса бронирования отелей необходимо войти в систему или зарегистрироваться.
            </motion.p>

            {/* Кнопки авторизации */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {/* Кнопка входа */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLoginModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Войти в систему
              </motion.button>

              {/* Кнопка регистрации */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRegisterModal(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Создать аккаунт
              </motion.button>

              {/* Демо данные */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
              >
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  💡 Для быстрого тестирования используйте:
                </p>
                <p className="text-xs text-yellow-700">
                  <strong>Email:</strong> demo@example.com<br />
                  <strong>Пароль:</strong> demo123
                </p>
              </motion.div>
            </motion.div>

            {/* Преимущества */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-gray-600">Безопасные<br />бронирования</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <UserPlus className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-gray-600">Личный<br />кабинет</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-gray-600">Защита<br />платежей</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Модальные окна авторизации */}
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />

        <RegisterModal 
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </>
    );
  }

  // Если пользователь авторизован или авторизация не требуется - показываем контент
  return <>{children}</>;
} 