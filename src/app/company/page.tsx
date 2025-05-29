'use client';

import { motion } from '@/lib/motion';
import Link from 'next/link';
import { Building, Users, TrendingUp, Shield, Clock, Award, ArrowRight, Heart, Globe } from 'lucide-react';

export default function CompanyPage() {
  const sections = [
    {
      title: 'О нас',
      description: 'Узнайте больше о нашей компании, миссии и ценностях',
      icon: <Building className="w-8 h-8" />,
      href: '/about',
      color: 'from-blue-500 to-indigo-600',
      features: ['История компании', 'Наша миссия', 'Команда', 'Достижения']
    },
    {
      title: 'Партнерам',
      description: 'Информация для отелей и хостелов о сотрудничестве',
      icon: <Users className="w-8 h-8" />,
      href: '/partners',
      color: 'from-green-500 to-emerald-600',
      features: ['Условия партнерства', 'Преимущества', 'Как стать партнером', 'Поддержка']
    }
  ];

  const stats = [
    { number: '10+', label: 'Лет на рынке', icon: <Clock className="w-6 h-6" /> },
    { number: '500+', label: 'Партнеров', icon: <Building className="w-6 h-6" /> },
    { number: '2M+', label: 'Довольных клиентов', icon: <Users className="w-6 h-6" /> },
    { number: '4.9', label: 'Рейтинг сервиса', icon: <Award className="w-6 h-6" /> }
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
            >
              <Building className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Компания</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              StayEasy - ведущая платформа для бронирования отелей и хостелов в Казахстане. 
              Мы создаем будущее путешествий уже сегодня.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-indigo-600 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
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

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Наши ценности</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Забота о клиентах</h3>
                <p className="text-gray-600">Мы всегда ставим потребности наших клиентов на первое место</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Надежность</h3>
                <p className="text-gray-600">Гарантируем безопасность и качество каждого бронирования</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Инновации</h3>
                <p className="text-gray-600">Постоянно развиваемся и внедряем новые технологии</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 