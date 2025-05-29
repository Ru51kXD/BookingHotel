'use client';

import { motion } from '@/lib/motion';
import { 
  Award, 
  Users, 
  Globe, 
  Heart, 
  Shield, 
  TrendingUp,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Sparkles,
  Building
} from 'lucide-react';
import Footer from '@/components/ui/Footer';

// Наши ценности
const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Забота о клиентах',
    description: 'Мы всегда ставим потребности наших клиентов на первое место',
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Надежность',
    description: 'Гарантируем безопасность и качество каждого бронирования',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Инновации',
    description: 'Постоянно развиваемся и внедряем новые технологии',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Глобальность',
    description: 'Объединяем лучшие отели и хостелы по всему миру',
    color: 'from-purple-500 to-indigo-500'
  }
];

// Достижения
const achievements = [
  { icon: <Award className="w-6 h-6" />, text: 'Лучший сервис 2023 года' },
  { icon: <Star className="w-6 h-6" />, text: '4.9 звезд в App Store' },
  { icon: <Users className="w-6 h-6" />, text: '2M+ довольных клиентов' },
  { icon: <CheckCircle className="w-6 h-6" />, text: 'ISO 27001 сертификат' },
];

const stats = [
  { number: '10+', label: 'Лет на рынке', icon: <Clock className="w-6 h-6" /> },
  { number: '500+', label: 'Партнеров', icon: <Building className="w-6 h-6" /> },
  { number: '2M+', label: 'Довольных клиентов', icon: <Users className="w-6 h-6" /> },
  { number: '4.9', label: 'Рейтинг сервиса', icon: <Award className="w-6 h-6" /> }
];

export default function AboutPage() {
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
              >
                <Building className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">О нас</h1>
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

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Сделать путешествия доступными и комфортными для каждого. Мы стремимся предоставить 
                  лучший сервис бронирования с широким выбором вариантов размещения по всему Казахстану.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  StayEasy - это современная платформа для бронирования отелей и хостелов в Казахстане. 
                  Мы предоставляем удобный и безопасный сервис для поиска и бронирования жилья с онлайн оплатой.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Почему выбирают нас</h3>
                <ul className="space-y-4">
                  {[
                    'Широкий выбор отелей и хостелов',
                    'Безопасная онлайн оплата',
                    'Круглосуточная поддержка клиентов',
                    'Лучшие цены и специальные предложения',
                    'Простой и удобный интерфейс'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Наши ценности</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-8">Наши достижения</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-center space-x-3 bg-white/10 rounded-lg p-4"
                  >
                    <div className="text-white/80">{achievement.icon}</div>
                    <span className="text-white font-medium">{achievement.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
} 