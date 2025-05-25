'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useCurrency } from '@/lib/currency';
import { motion } from '@/lib/motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  CreditCard, 
  User,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    shareData: false
  });

  const [preferences, setPreferences] = useState({
    language: 'ru',
    currency: 'kzt',
    timezone: 'Asia/Almaty'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Загрузка сохраненных настроек при монтировании
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('userPreferences');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed.notifications) setNotifications(parsed.notifications);
          if (parsed.security) setSecurity(parsed.security);
          if (parsed.privacy) setPrivacy(parsed.privacy);
          if (parsed.preferences) setPreferences(parsed.preferences);
        } catch (error) {
          console.log('Ошибка при загрузке настроек:', error);
        }
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Пожалуйста, войдите в систему</p>
          <Link href="/account" className="text-blue-600 hover:underline">
            Войти в аккаунт
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveSettings = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Синхронизируем валюту с контекстом
      if (preferences.currency !== currency) {
        setCurrency(preferences.currency as any);
      }

      // Сохраняем настройки в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify({
          notifications,
          security,
          privacy,
          preferences
        }));
      }

      // Симуляция сохранения настроек на сервере
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage('Настройки успешно сохранены! Валюта и предпочтения применены, цены обновлены.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Ошибка при сохранении настроек');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Пароли не совпадают');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Новый пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);
    setMessage('');

    // Симуляция смены пароля
    await new Promise(resolve => setTimeout(resolve, 2000));

    setMessage('Пароль успешно изменен!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setTimeout(() => setMessage(''), 3000);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/account"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад в личный кабинет
          </Link>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Настройки</h1>
              <p className="text-gray-600">Управляйте своими предпочтениями и безопасностью</p>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center ${
              message.includes('успешно') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.includes('успешно') && <CheckCircle className="w-5 h-5 mr-2" />}
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Уведомления</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email уведомления</p>
                  <p className="text-sm text-gray-600">Получать уведомления на email</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.email ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push уведомления</p>
                  <p className="text-sm text-gray-600">Уведомления в браузере</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.push ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.push ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS уведомления</p>
                  <p className="text-sm text-gray-600">Уведомления по SMS</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.sms ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.sms ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Маркетинговые email</p>
                  <p className="text-sm text-gray-600">Специальные предложения</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications.marketing ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.marketing ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Безопасность</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Двухфакторная аутентификация</p>
                  <p className="text-sm text-gray-600">Дополнительная защита аккаунта</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    security.twoFactor ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    security.twoFactor ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Уведомления о входе</p>
                  <p className="text-sm text-gray-600">Уведомлять о новых входах</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    security.loginAlerts ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    security.loginAlerts ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Изменить пароль</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Текущий пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Введите текущий пароль"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Новый пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Введите новый пароль"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подтвердите новый пароль
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Подтвердите новый пароль"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePasswordChange}
                  disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Изменение...' : 'Изменить пароль'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Privacy & Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Приватность</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Публичный профиль</p>
                  <p className="text-sm text-gray-600">Показывать профиль другим</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPrivacy({ ...privacy, profilePublic: !privacy.profilePublic })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    privacy.profilePublic ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    privacy.profilePublic ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Обмен данными</p>
                  <p className="text-sm text-gray-600">Для улучшения сервиса</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPrivacy({ ...privacy, shareData: !privacy.shareData })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    privacy.shareData ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    privacy.shareData ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </motion.button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Предпочтения</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Язык интерфейса
                  </label>
                  <select 
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    <option value="ru">Русский</option>
                    <option value="kk">Қазақша</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Валюта
                  </label>
                  <select 
                    value={preferences.currency}
                    onChange={(e) => {
                      const newCurrency = e.target.value;
                      setPreferences({ ...preferences, currency: newCurrency });
                      // Мгновенно обновляем валюту в контексте для предварительного просмотра
                      setCurrency(newCurrency as any);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    <option value="kzt">Казахстанский тенге (₸)</option>
                    <option value="rub">Российский рубль (₽)</option>
                    <option value="usd">Доллар США ($)</option>
                    <option value="eur">Евро (€)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Цены на отелях автоматически пересчитаются в выбранную валюту
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Часовой пояс
                  </label>
                  <select 
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    <option value="Europe/Moscow">Москва (UTC+3)</option>
                    <option value="Asia/Almaty">Астана (UTC+6)</option>
                    <option value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</option>
                    <option value="Asia/Novosibirsk">Новосибирск (UTC+7)</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Сохранить настройки
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 