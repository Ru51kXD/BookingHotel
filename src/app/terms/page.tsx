'use client';

import { motion } from '@/lib/motion';
import { FileText, Shield, AlertCircle, CreditCard, Calendar, Phone, Mail } from 'lucide-react';
import Footer from '@/components/ui/Footer';

export default function TermsPage() {
  const sections = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Бронирование',
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Все бронирования подтверждаются после успешной оплаты',
        'Цены указаны в тенге (₸) и включают все налоги',
        'Бронирование считается действительным после получения подтверждения',
        'Минимальный возраст для бронирования - 18 лет'
      ]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Отмена бронирования',
      color: 'from-orange-500 to-red-500',
      items: [
        'Условия отмены зависят от политики конкретного отеля',
        'Возврат средств осуществляется в соответствии с условиями отмены',
        'Отмена должна быть произведена через личный кабинет или службу поддержки',
        'Возврат средств может занимать до 14 рабочих дней'
      ]
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Оплата',
      color: 'from-green-500 to-emerald-500',
      items: [
        'Принимаются банковские карты Visa, MasterCard',
        'Все платежи обрабатываются через защищенные каналы',
        'Комиссия за обработку платежа может взиматься банком',
        'Оплата производится в тенге (₸)'
      ]
    }
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mb-6"
              >
                <FileText className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Правила и условия</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Настоящие Правила и условия регулируют использование сервиса StayEasy 
                для бронирования отелей и хостелов.
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

            {/* Responsibility Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-6 text-white">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Ответственность</h2>
              </div>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  StayEasy выступает в качестве посредника между клиентами и поставщиками услуг размещения. 
                  Мы не несем ответственности за качество услуг, предоставляемых отелями и хостелами.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2 text-lg">Важная информация</h4>
                      <p className="text-yellow-700">
                        Пожалуйста, внимательно ознакомьтесь с условиями бронирования 
                        каждого отеля перед подтверждением заказа. Условия могут различаться 
                        в зависимости от выбранного объекта размещения.
                      </p>
                    </div>
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
              <h2 className="text-3xl font-bold mb-6 text-center">Контактная информация</h2>
              <p className="text-center text-white/90 mb-8 text-lg">
                По вопросам, связанным с правилами и условиями
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-white/90">legal@stayeasy.kz</p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-white/90">+7 (717) 123-45-67</p>
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