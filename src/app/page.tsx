'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from '@/lib/motion';
import { Search, MapPin, Calendar, Star, Award, Shield, HeadphonesIcon, ArrowRight } from 'lucide-react';

// Оптимизированный динамический импорт
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { 
  ssr: true,
  loading: () => <div className="h-20 bg-white/90 backdrop-blur-md" />
});
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { 
  ssr: false,
  loading: () => <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800" />
});
const HotelSearch = dynamic(() => import('@/components/ui/HotelSearch'), { 
  ssr: false,
  loading: () => <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse h-96" />
});

// Данные для популярных направлений
const popularDestinations = [
  {
    id: 1,
    name: 'Астана',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
    hotels: 156,
    rating: 4.7,
    description: 'Современная столица Казахстана',
    country: 'Казахстан'
  },
  {
    id: 2,
    name: 'Алматы',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
    hotels: 243,
    rating: 4.8,
    description: 'Южная столица с видом на горы',
    country: 'Казахстан'
  },
  {
    id: 3,
    name: 'Шымкент',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&auto=format',
    hotels: 89,
    rating: 4.5,
    description: 'Третий по величине город Казахстана',
    country: 'Казахстан'
  },
  {
    id: 4,
    name: 'Париж',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop&auto=format',
    hotels: 4206,
    rating: 4.8,
    description: 'Город света и романтики',
    country: 'Франция'
  },
  {
    id: 5,
    name: 'Токио',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&auto=format',
    hotels: 3806,
    rating: 4.9,
    description: 'Современная японская столица',
    country: 'Япония'
  },
  {
    id: 6,
    name: 'Дубай',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&auto=format',
    hotels: 2106,
    rating: 4.8,
    description: 'Роскошный город будущего',
    country: 'ОАЭ'
  },
  {
    id: 7,
    name: 'Лондон',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop&auto=format',
    hotels: 3656,
    rating: 4.6,
    description: 'Историческая британская столица',
    country: 'Великобритания'
  },
  {
    id: 8,
    name: 'Нью-Йорк',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop&auto=format',
    hotels: 5206,
    rating: 4.7,
    description: 'Город, который никогда не спит',
    country: 'США'
  },
];

// Преимущества сервиса
const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Безопасные платежи',
    description: 'Защищенные транзакции и возврат средств',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Лучшие цены',
    description: 'Гарантируем самые выгодные предложения',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8" />,
    title: 'Поддержка 24/7',
    description: 'Круглосуточная помощь на любом языке',
    color: 'from-purple-500 to-pink-500'
  }
];

export default function Home() {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Упрощенные параллакс эффекты для лучшей производительности
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  
  // Уменьшена интенсивность анимаций для быстрой прокрутки
  const smoothText = useSpring(textY, { stiffness: 100, damping: 25, mass: 0.5 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 25 });

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleSearch = () => {
    // Перенаправляем на страницу отелей с параметрами поиска
    const params = new URLSearchParams();
    
    if (searchData.destination) {
      // Проверяем, является ли введенный текст названием страны
      const isCountry = popularDestinations.some(
        dest => dest.country.toLowerCase() === searchData.destination.toLowerCase()
      );
      
      // Если это страна, добавляем параметр country, иначе общий параметр q
      if (isCountry) {
        params.append('country', searchData.destination);
      } else {
        params.append('q', searchData.destination);
      }
    }
    
    if (searchData.checkIn) params.append('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.append('checkOut', searchData.checkOut);
    if (searchData.guests) params.append('guests', searchData.guests.toString());
    
    // Переходим на страницу отелей вместо поиска для лучшего UX
    window.location.href = `/hotels?${params.toString()}`;
  };

  return (
    <>
      {/* Оптимизированный Hero Section */}
      <ParallaxBackground
        intensity={0.3}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 pt-20"
      >
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-7xl mx-auto px-4 py-20"
        >
          <motion.div 
            style={{ y: smoothText, opacity: smoothOpacity }}
            className="text-center"
          >
            <div className="max-w-5xl mx-auto">
              <motion.div variants={itemVariants} className="mb-12">
                <motion.span 
                  className="inline-block bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20 mb-8"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨ Найдите идеальное место для отдыха по всему миру
                </motion.span>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Мировые
                  </span>
                  <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Отели
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
                  variants={itemVariants}
                >
                  Более <span className="font-bold text-yellow-300">100,000</span> проверенных вариантов размещения в <span className="font-bold text-yellow-300">190+ странах</span>
                </motion.p>
              </motion.div>

              {/* Оптимизированная форма поиска */}
              <motion.div 
                variants={itemVariants}
                className="max-w-6xl mx-auto mb-16"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div 
                      className="md:col-span-1"
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-white/80 font-medium mb-2">Куда едем?</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                        <input
                          type="text"
                          value={searchData.destination}
                          onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                          placeholder="Страна, город или отель"
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div transition={{ duration: 0.2 }}>
                      <label className="block text-white/80 font-medium mb-2">Заезд</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                        <input
                          type="date"
                          value={searchData.checkIn}
                          onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div transition={{ duration: 0.2 }}>
                      <label className="block text-white/80 font-medium mb-2">Выезд</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                        <input
                          type="date"
                          value={searchData.checkOut}
                          onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.button
                      onClick={handleSearch}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl py-4 px-6 hover:from-pink-600 hover:to-purple-700 transition-all font-bold flex items-center justify-center shadow-lg mt-7"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Найти
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Статистика */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { number: '100K+', label: 'Отелей', icon: '🏨' },
                  { number: '190+', label: 'Стран', icon: '🌍' },
                  { number: '4.9', label: 'Рейтинг', icon: '⭐' },
                  { number: '24/7', label: 'Поддержка', icon: '🛎️' }
                ].map((stat, index) => (
                  <motion.div
                    key={`stat-${index}`}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255,255,255,0.15)' 
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </ParallaxBackground>

      {/* Преимущества */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Почему выбирают нас
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Мы предлагаем лучший сервис бронирования с гарантией качества по всему миру
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={`feature-${index}`}
                variants={itemVariants}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-lg border border-gray-100 group"
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6 group-hover:scale-110`}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Поиск отелей по базе данных */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden"
      >
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(99, 102, 241, 0.3)",
                  "0 8px 25px rgba(147, 51, 234, 0.4)",
                  "0 4px 20px rgba(99, 102, 241, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Более 100,000 вариантов размещения по всему миру
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Найдите свой идеальный отель
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
              Воспользуйтесь нашим удобным поиском по базе данных отелей. У нас есть варианты для любого бюджета и вкуса в любой точке мира.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="max-w-5xl mx-auto"
          >
            <HotelSearch />
          </motion.div>
          
          {/* Дополнительная информация */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: '🏨', title: '100K+ отелей', desc: 'В 10+ категориях' },
              { icon: '🌍', title: '190+ стран', desc: 'По всему миру' },
              { icon: '⭐', title: '4.9+ рейтинг', desc: 'Средняя оценка' }
            ].map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Популярные направления */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Популярные направления
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Откройте для себя лучшие места для незабываемого отдыха по всему миру
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-3xl shadow-lg"
                whileHover={{ 
                  scale: 1.03,
                  y: -10
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p className="text-white/80 text-sm">{destination.country}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-3">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">{destination.hotels.toLocaleString()} отелей</span>
                    <Link href={`/hotels?city=${encodeURIComponent(destination.name)}`}>
                      <motion.button
                        className="flex items-center text-white hover:text-yellow-300 transition-colors"
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          console.log('Клик по кнопке "Смотреть" для направления:', destination.name);
                          console.log('Ссылка:', `/hotels?city=${encodeURIComponent(destination.name)}`);
                        }}
                      >
                        <span className="text-sm mr-1">Смотреть</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Link href="/destinations">
              <motion.button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log('Клик по кнопке "Посмотреть все направления"');
                  console.log('Ссылка: /destinations');
                }}
              >
                Посмотреть все направления
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Призыв к действию */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы к незабываемому путешествию?
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Присоединяйтесь к миллионам путешественников, которые доверяют нам свой отдых по всему миру
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hotels">
                <motion.button
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Начать поиск
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Узнать больше
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
