'use client';

import { motion } from '@/lib/motion';
import { Shield, Lock, Eye, Database, UserCheck, Cookie, Phone, Mail, MapPin } from 'lucide-react';
import Footer from '@/components/ui/Footer';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Какие данные мы собираем',
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Имя, фамилия и контактная информация',
        'Данные банковской карты (в зашифрованном виде)',
        'История бронирований и предпочтения',
        'Техническая информация об устройстве и браузере'
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Как мы используем данные',
      color: 'from-green-500 to-emerald-500',
      items: [
        'Обработка бронирований и платежей',
        'Предоставление клиентской поддержки',
        'Улучшение качества сервиса',
        'Отправка важных уведомлений о бронированиях'
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Защита данных',
      color: 'from-purple-500 to-indigo-500',
      items: [
        'Шифрование всех передаваемых данных (SSL/TLS)',
        'Безопасное хранение в защищенных дата-центрах',
        'Ограниченный доступ только для авторизованного персонала',
        'Регулярные аудиты безопасности'
      ]
    }
  ];

  const rights = [
    'Запросить доступ к вашим персональным данным',
    'Исправить неточную информацию',
    'Удалить ваши данные (при отсутствии правовых оснований для хранения)',
    'Ограничить обработку ваших данных',
    'Отозвать согласие на обработку данных'
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-6"
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Политика конфиденциальности</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                StayEasy серьезно относится к защите персональных данных наших пользователей. 
                Данная политика описывает, как мы собираем, используем и защищаем вашу информацию.
              </p>
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center mb-6 text-white`}>
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Rights Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-6 text-white">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Ваши права</h2>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                В соответствии с законодательством Республики Казахстан, вы имеете право:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rights.map((right, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{right}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cookie Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-6 text-white">
                  <Cookie className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Файлы cookie</h2>
              </div>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Мы используем файлы cookie для улучшения работы сайта и персонализации вашего опыта. 
                Вы можете управлять настройками cookie в вашем браузере.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Типы cookie:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
                  <div>
                    <strong>Функциональные</strong><br />
                    <span className="text-sm">Необходимые для работы сайта</span>
                  </div>
                  <div>
                    <strong>Аналитические</strong><br />
                    <span className="text-sm">Для улучшения сервиса</span>
                  </div>
                  <div>
                    <strong>Маркетинговые</strong><br />
                    <span className="text-sm">Для персонализации рекламы</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Контакты по вопросам конфиденциальности</h2>
              <p className="text-center text-white/90 mb-8 text-lg">
                По вопросам защиты персональных данных обращайтесь
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-white/90">privacy@stayeasy.kz</p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-white/90">+7 (717) 123-45-67</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Адрес</h3>
                  <p className="text-white/90">г. Астана, пр. Мангилик Ел, 55</p>
                </div>
              </div>
              <div className="text-center mt-8 pt-6 border-t border-white/20">
                <p className="text-white/70 text-sm">
                  Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
} 