'use client';

import { motion } from '@/lib/motion';
import Link from 'next/link';
import { Building, Bed, Tag, Gift, ArrowRight, Star, MapPin, Users, Clock } from 'lucide-react';

export default function ServicesPage() {
  const sections = [
    {
      title: 'Отели',
      description: 'Широкий выбор отелей от эконом до люкс класса',
      icon: <Building className="w-8 h-8" />,
      href: '/hotels',
      color: 'from-blue-500 to-indigo-600',
      features: ['5-звездочные отели', 'Бизнес-отели', 'Семейные отели', 'Бутик-отели'],
      stats: '500+ отелей'
    },
    {
      title: 'Хостелы',
      description: 'Бюджетное размещение для путешественников',
      icon: <Bed className="w-8 h-8" />,
      href: '/hostels',
      color: 'from-green-500 to-emerald-600',
      features: ['Общие комнаты', 'Приватные номера', 'Женские дормы', 'Социальные зоны'],
      stats: '150+ хостелов'
    },
    {
      title: 'Специальные предложения',
      description: 'Лучшие скидки и акции для ваших путешествий',
      icon: <Tag className="w-8 h-8" />,
      href: '/offers',
      color: 'from-purple-500 to-pink-600',
      features: ['Раннее бронирование', 'Сезонные скидки', 'Длительное пребывание', 'Выходные акции'],
      stats: 'До 30% скидки'
    },
    {
      title: 'Подарочные сертификаты',
      description: 'Идеальный подарок для любителей путешествий',
      icon: <Gift className="w-8 h-8" />,
      href: '/gift-cards',
      color: 'from-orange-500 to-red-600',
      features: ['Любая сумма', 'Без срока действия', 'Красивое оформление', 'Персональные сообщения'],
      stats: 'От 10,000 ₸'
    }
  ];

  const advantages = [
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Высокое качество',
      description: 'Все объекты размещения проходят строгую проверку качества'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Удобное расположение',
      description: 'Отели и хостелы в лучших районах городов Казахстана'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Поддержка 24/7',
      description: 'Круглосуточная помощь на всех этапах путешествия'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Быстрое бронирование',
      description: 'Мгновенное подтверждение и удобная оплата онлайн'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-6"
            >
              <Building className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Сервисы</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр услуг для комфортного путешествия. 
              От бюджетных хостелов до роскошных отелей.
            </p>
          </div>

          {/* Main Services */}
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
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="bg-white/20 rounded-full p-3 mr-4">
                          {section.icon}
                        </div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                      </div>
                      <div className="text-white/80 font-semibold text-sm">
                        {section.stats}
                      </div>
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
                      Перейти к сервису
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Наши преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Готовы начать путешествие?</h2>
            <p className="text-xl text-white/90 mb-8">
              Выберите идеальное размещение из нашего каталога
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hotels">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Найти отель
                </motion.button>
              </Link>
              <Link href="/hostels">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Найти хостел
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 