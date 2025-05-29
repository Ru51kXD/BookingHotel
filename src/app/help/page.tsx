'use client';

import { motion } from '@/lib/motion';
import Link from 'next/link';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Shield, ArrowRight, Clock } from 'lucide-react';
import Footer from '@/components/ui/Footer';

export default function HelpPage() {
  const sections = [
    {
      title: 'Поддержка',
      description: 'Круглосуточная помощь и консультации по всем вопросам',
      icon: <MessageCircle className="w-8 h-8" />,
      href: '/support',
      color: 'from-blue-500 to-cyan-600',
      features: ['Онлайн чат 24/7', 'Телефонная поддержка', 'Email поддержка', 'Форма обратной связи']
    },
    {
      title: 'Вопросы и ответы',
      description: 'Часто задаваемые вопросы и подробные ответы',
      icon: <HelpCircle className="w-8 h-8" />,
      href: '/faq',
      color: 'from-green-500 to-emerald-600',
      features: ['Бронирование', 'Оплата', 'Отмена', 'Изменения']
    },
    {
      title: 'Правила',
      description: 'Условия использования сервиса и правила бронирования',
      icon: <FileText className="w-8 h-8" />,
      href: '/terms',
      color: 'from-purple-500 to-indigo-600',
      features: ['Общие положения', 'Условия бронирования', 'Оплата', 'Ответственность']
    },
    {
      title: 'Конфиденциальность',
      description: 'Политика защиты персональных данных',
      icon: <Shield className="w-8 h-8" />,
      href: '/privacy',
      color: 'from-red-500 to-pink-600',
      features: ['Защита данных', 'Права пользователей', 'Файлы cookie', 'Контакты']
    }
  ];

  const quickHelp = [
    {
      question: 'Как забронировать отель?',
      answer: 'Выберите отель, укажите даты и количество гостей, затем оплатите бронирование.',
      icon: <Phone className="w-5 h-5" />
    },
    {
      question: 'Можно ли отменить бронирование?',
      answer: 'Да, условия отмены зависят от политики конкретного отеля.',
      icon: <Mail className="w-5 h-5" />
    },
    {
      question: 'Как связаться с поддержкой?',
      answer: 'Через онлайн чат, телефон +7 (717) 123-45-67 или email support@stayeasy.kz',
      icon: <MessageCircle className="w-5 h-5" />
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
              >
                <HelpCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Помощь</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы готовы помочь вам в любое время. Найдите ответы на ваши вопросы 
                или свяжитесь с нашей службой поддержки.
              </p>
            </div>

            {/* Quick Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Быстрая помощь</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {quickHelp.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-blue-600 mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={section.href}>
                    <div className={`bg-gradient-to-r ${section.color} rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                      <div className="flex items-center mb-6">
                        <div className="bg-white/20 rounded-full p-3 mr-4">
                          {section.icon}
                        </div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                      </div>
                      
                      <p className="text-white/90 mb-6 text-lg">{section.description}</p>
                      
                      <ul className="space-y-2 mb-6">
                        {section.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-white/60 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                        Подробнее
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Нужна помощь прямо сейчас?</h2>
              <p className="text-xl text-white/90 mb-8">
                Наша служба поддержки работает круглосуточно
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <Phone className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-white/80">+7 (717) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-white/80">support@stayeasy.kz</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Время работы</div>
                    <div className="text-white/80">24/7</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
} 