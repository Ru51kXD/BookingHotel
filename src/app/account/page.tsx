'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useBooking } from '@/lib/booking';
import { usePayments } from '@/lib/payments';
import { useCurrency } from '@/lib/currency';
import { motion } from '@/lib/motion';
import Link from 'next/link';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  BookOpen,
  TrendingUp,
  MapPin,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

export default function AccountPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { bookings, loadUserBookings } = useBooking();
  const { cards, loadUserCards } = usePayments();
  const { formatPrice } = useCurrency();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadUserBookings(user.id);
      loadUserCards(user.id);
    }
  }, [user?.id, loadUserBookings, loadUserCards]);

  // Если пользователь не авторизован
  if (!authLoading && !user) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-white rounded-3xl shadow-xl p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
                >
                  <User className="w-12 h-12 text-white" />
                </motion.div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Добро пожаловать в личный кабинет
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                  Войдите в свой аккаунт или создайте новый, чтобы управлять бронированиями и получать персональные предложения
                </p>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLoginModal(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Войти в аккаунт
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Создать аккаунт
                  </motion.button>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ваши бронирования</h3>
                      <p className="text-sm text-gray-600">Управляйте всеми поездками</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Безопасные платежи</h3>
                      <p className="text-sm text-gray-600">Защищенные транзакции</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Персональные предложения</h3>
                      <p className="text-sm text-gray-600">Скидки и бонусы</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем ваш аккаунт...</p>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const totalSpent = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const quickActions = [
    {
      title: 'Мои бронирования',
      description: 'Просмотр всех поездок',
      icon: BookOpen,
      href: '/account/bookings',
      color: 'from-blue-500 to-blue-600',
      count: bookings.length
    },
    {
      title: 'Способы оплаты',
      description: 'Управление картами',
      icon: CreditCard,
      href: '/account/payments',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Профиль',
      description: 'Личные данные',
      icon: User,
      href: '/account/profile',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Настройки',
      description: 'Уведомления и безопасность',
      icon: Settings,
      href: '/account/settings',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Привет, {user?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-white/90 text-lg">
                  Добро пожаловать в ваш личный кабинет
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="mt-4 md:mt-0 flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Выйти</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{activeBookings.length}</span>
                </div>
                <h3 className="font-semibold text-gray-900">Активные поездки</h3>
                <p className="text-sm text-gray-600">Подтвержденные бронирования</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{completedBookings.length}</span>
                </div>
                <h3 className="font-semibold text-gray-900">Завершенные</h3>
                <p className="text-sm text-gray-600">Прошедшие поездки</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(totalSpent)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">Общая сумма</h3>
                <p className="text-sm text-gray-600">За все время</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Быстрые действия</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        {action.count !== undefined && (
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            {action.count}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                        <span className="text-sm font-medium">Перейти</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                Последняя активность
              </h3>
              
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {booking.hotel.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(booking.created_at).toLocaleDateString('ru-RU')}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            booking.status === 'confirmed' ? 'bg-green-500' :
                            booking.status === 'pending' ? 'bg-yellow-500' :
                            booking.status === 'cancelled' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`} />
                          <span className="text-xs text-gray-500 capitalize">
                            {booking.status === 'confirmed' ? 'Подтверждено' :
                             booking.status === 'pending' ? 'Ожидание' :
                             booking.status === 'cancelled' ? 'Отменено' :
                             'Завершено'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Link href="/account/bookings">
                    <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
                      Показать все
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Пока нет бронирований</p>
                  <Link href="/hotels">
                    <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Найти отель
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Профиль заполнен</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Основные данные</span>
                  <span className="text-sm font-medium text-green-600">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Телефон</span>
                  <span className={`text-sm font-medium ${user?.phone ? 'text-green-600' : 'text-gray-400'}`}>
                    {user?.phone ? '✓' : '−'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Способ оплаты</span>
                  <span className={`text-sm font-medium ${cards.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {cards.length > 0 ? '✓' : '−'}
                  </span>
                </div>
              </div>

              <div className="mt-4 bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Прогресс</span>
                  <span className="text-sm text-gray-600">
                    {Math.round(((2 + (user?.phone ? 1 : 0) + (cards.length > 0 ? 1 : 0)) / 4) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-2/3"
                    style={{ 
                      width: `${Math.round(((2 + (user?.phone ? 1 : 0) + (cards.length > 0 ? 1 : 0)) / 4) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              <Link href="/account/profile">
                <button className="w-full mt-4 bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-all">
                  {Math.round(((2 + (user?.phone ? 1 : 0) + (cards.length > 0 ? 1 : 0)) / 4) * 100) === 100 ? 'Посмотреть профиль' : 'Завершить профиль'}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 