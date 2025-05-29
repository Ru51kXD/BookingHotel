'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useSpring } from '@/lib/motion';
import { Search, SlidersHorizontal, ChevronDown, Wifi, Coffee, Car, Tv, AirVent, Utensils, Filter, Grid3X3, LayoutGrid, Bed, MapPin, Star } from 'lucide-react';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
const HotelCard = dynamic(() => import('@/components/hotel/HotelCard'), { ssr: true });
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { ssr: false });
const AnimatedChart = dynamic(() => import('@/components/ui/AnimatedChart'), { ssr: false });

// Данные для хостелов
const hostels = [
  {
    id: 1,
    name: 'Astana Backpackers',
    location: 'Центр города, Астана',
    rating: 4.5,
    price: 3500,
    image: '/images/hostel1.jpg',
    amenities: ['wifi', 'breakfast', 'parking']
  },
  {
    id: 2,
    name: 'Nomad Hostel',
    location: 'Есиль район, Астана',
    rating: 4.3,
    price: 2800,
    image: '/images/hostel2.jpg',
    amenities: ['wifi', 'breakfast']
  },
  {
    id: 3,
    name: 'City Center Hostel',
    location: 'Алматы район, Алматы',
    rating: 4.7,
    price: 4200,
    image: '/images/hostel3.jpg',
    amenities: ['wifi', 'parking']
  },
  {
    id: 4,
    name: 'Хостел Метро',
    image: '/images/hostel-1.jpg',
    rating: 4.6,
    price: 1200,
    location: 'Москва, метро Сокольники',
    description: 'Современный хостел рядом с метро с общими и приватными комнатами, кухней и лаунж-зоной.',
    amenities: ['WiFi', 'Kitchen', 'Laundry', 'Lockers', 'Common Room'],
  },
  {
    id: 5,
    name: 'BackPacker Hub',
    image: '/images/hostel-2.jpg',
    rating: 4.8,
    price: 950,
    location: 'Москва, Арбат',
    description: 'Уютный хостел в центре города с дружелюбной атмосферой и отличными удобствами для путешественников.',
    amenities: ['WiFi', 'Kitchen', 'Bar', 'Tours', 'Breakfast'],
  },
  {
    id: 6,
    name: 'Дом Путешественника',
    image: '/images/hostel-3.jpg',
    rating: 4.5,
    price: 1100,
    location: 'Москва, Китай-город',
    description: 'Стильный хостел в историческом районе с современными удобствами и отличным расположением.',
    amenities: ['WiFi', 'Kitchen', 'Lockers', 'Luggage Storage'],
  },
  {
    id: 7,
    name: 'Urban Nest',
    image: '/images/hostel-4.jpg',
    rating: 4.7,
    price: 1350,
    location: 'Москва, Тверская',
    description: 'Премиальный хостел с дизайнерским интерьером и высоким уровнем комфорта.',
    amenities: ['WiFi', 'Kitchen', 'Gym', 'Rooftop', 'Coworking'],
  },
  {
    id: 8,
    name: 'Молодежный Дом',
    image: '/images/hostel-5.jpg',
    rating: 4.4,
    price: 850,
    location: 'Москва, Красные Ворота',
    description: 'Бюджетный хостел с веселой атмосферой и активной программой мероприятий.',
    amenities: ['WiFi', 'Kitchen', 'Games', 'Events', 'Library'],
  },
  {
    id: 9,
    name: 'Sleep & Meet',
    image: '/images/hostel-6.jpg',
    rating: 4.3,
    price: 1050,
    location: 'Москва, Парк Культуры',
    description: 'Социальный хостел с акцентом на знакомства и культурный обмен между путешественниками.',
    amenities: ['WiFi', 'Kitchen', 'Social Events', 'Tours', 'Bar'],
  },
];

const filterCategories = [
  {
    name: 'Удобства',
    options: [
      { label: 'Wi-Fi', value: 'wifi', icon: <Wifi size={16} /> },
      { label: 'Кухня', value: 'kitchen', icon: <Coffee size={16} /> },
      { label: 'Прачечная', value: 'laundry', icon: <Car size={16} /> },
      { label: 'Шкафчики', value: 'lockers', icon: <Tv size={16} /> },
      { label: 'Общая зона', value: 'common', icon: <AirVent size={16} /> },
      { label: 'Бар', value: 'bar', icon: <Utensils size={16} /> },
    ],
  },
  {
    name: 'Тип размещения',
    options: [
      { label: 'Общая комната', value: 'dorm', icon: undefined },
      { label: 'Приватная комната', value: 'private', icon: undefined },
      { label: 'Женский дорм', value: 'female', icon: undefined },
    ],
  },
  {
    name: 'Цена за ночь',
    options: [
      { label: 'До 1000 ₽', value: 'price_1', icon: undefined },
      { label: '1000 - 1500 ₽', value: 'price_2', icon: undefined },
      { label: '1500 - 2000 ₽', value: 'price_3', icon: undefined },
      { label: 'Более 2000 ₽', value: 'price_4', icon: undefined },
    ],
  },
];

// Данные для графиков хостелов
const hostelStatsData = [
  { label: 'Общие комнаты', value: 65, color: 'from-blue-500 to-cyan-500' },
  { label: 'Приватные', value: 25, color: 'from-green-500 to-emerald-500' },
  { label: 'Женские', value: 10, color: 'from-purple-500 to-pink-500' }
];

const ageGroupData = [
  { label: '18-25', value: 45, color: 'from-yellow-500 to-orange-500' },
  { label: '26-35', value: 35, color: 'from-blue-500 to-cyan-500' },
  { label: '36+', value: 20, color: 'from-green-500 to-emerald-500' }
];

export default function HostelsPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Параллакс эффекты для Hero секции
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Плавные анимации
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });

  // Анимация контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  };

  // Анимация для элементов
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="pt-24">
      <Navbar />
      
      {/* Hero Section с параллакс эффектом */}
      <ParallaxBackground intensity={2} className="relative">
        <motion.section 
          ref={heroRef}
          className="relative bg-gradient-to-br from-green-900 via-teal-900 to-cyan-800 text-white py-32 overflow-hidden"
        >
          {/* Параллакс фон */}
          <motion.div
            style={{ y: smoothHeroY, scale: heroScale, opacity: smoothHeroOpacity }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20 bg-center"></div>
          </motion.div>
          
          {/* Анимированные частицы */}
          <div className="absolute inset-0">
            {[...Array(35)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100, -20],
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div 
                className="mb-8"
                whileInView={{ 
                  scale: [0.9, 1.02, 1],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.span 
                  className="inline-block bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20 mb-8"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                  whileInView={{
                    y: [0, -5, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🏠 Найдите идеальный хостел
                </motion.span>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight"
                  whileInView={{ scale: [0.9, 1] }}
                >
                  <motion.span 
                    className="block bg-gradient-to-r from-white via-green-100 to-teal-100 bg-clip-text text-transparent"
                    whileInView={{
                      backgroundImage: [
                        'linear-gradient(to right, #ffffff, #dcfce7, #ccfbf1)',
                        'linear-gradient(to right, #86efac, #67e8f9, #34d399)',
                        'linear-gradient(to right, #ffffff, #dcfce7, #ccfbf1)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Лучшие хостелы
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent"
                    whileInView={{
                      backgroundImage: [
                        'linear-gradient(to right, #fbbf24, #4ade80, #22d3ee)',
                        'linear-gradient(to right, #f59e0b, #16a34a, #0891b2)',
                        'linear-gradient(to right, #fbbf24, #4ade80, #22d3ee)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    для путешественников
                  </motion.span>
                </motion.h1>
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Откройте для себя <span className="font-bold text-yellow-300">{hostels.length}</span> уютных хостелов с отличной атмосферой и доступными ценами
              </motion.p>
              
              {/* Улучшенная строка поиска */}
              <motion.div 
                className="max-w-5xl mx-auto mb-12"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <motion.div className="md:col-span-2 relative" whileHover={{ scale: 1.02 }}>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                        <motion.input
                          type="text"
                          placeholder="Название хостела, район или станция метро..."
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                      <select className="w-full px-4 py-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all appearance-none">
                        <option value="">Тип размещения</option>
                        <option value="dorm">Общая комната</option>
                        <option value="private">Приватная комната</option>
                        <option value="female">Женский дорм</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded-xl py-4 px-6 hover:from-green-500 hover:to-cyan-600 transition-all font-bold flex items-center justify-center shadow-lg group"
                    >
                      <Search className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                      Найти
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Статистика в Hero */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[
                  { number: hostels.length, label: 'Хостелов', suffix: '', color: 'from-green-400 to-green-600' },
                  { number: 89, label: 'Заполненность', suffix: '%', color: 'from-cyan-400 to-cyan-600' },
                  { number: 4.6, label: 'Средний рейтинг', suffix: '/5', color: 'from-yellow-400 to-yellow-600' },
                  { number: 950, label: 'Средняя цена', suffix: '₽', color: 'from-teal-400 to-teal-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      rotateY: 5 
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}{stat.suffix}
                    </div>
                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </ParallaxBackground>

      {/* Графики для хостелов */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Статистика хостелов
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Данные о типах размещения и возрастных группах гостей
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <AnimatedChart
                data={hostelStatsData}
                type="pie"
                title="Типы размещения"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <AnimatedChart
                data={ageGroupData}
                type="bar"
                title="Возрастные группы гостей"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Main Content */}
      <motion.section 
        ref={containerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="py-16 bg-gradient-to-br from-green-50 to-cyan-50 relative overflow-hidden"
      >
        {/* Декоративные элементы фона */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-32 left-20 w-96 h-96 bg-gradient-to-r from-green-200/30 to-cyan-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-teal-200/30 to-yellow-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <motion.aside
              variants={itemVariants} 
              className="lg:w-1/4 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 h-fit sticky top-24 border border-white/50"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <motion.h2 
                  className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Filter className="mr-2 h-6 w-6 text-green-600" />
                  Фильтры
                </motion.h2>
                <motion.button 
                  className="text-green-600 text-sm font-medium hover:text-green-800 transition-colors bg-green-50 px-4 py-2 rounded-full"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "#dcfce7",
                    rotate: [0, 5, -5, 0]
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  Сбросить
                </motion.button>
              </div>
              
              {/* Filter Sections */}
              <div className="space-y-8">
                {filterCategories.map((category, idx) => (
                  <motion.div 
                    key={idx} 
                    className="border-b border-gray-200/50 pb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.h3 
                      className="font-semibold text-gray-700 mb-6 text-lg flex items-center"
                      whileHover={{ color: "#059669" }}
                    >
                      {category.name}
                    </motion.h3>
                    <div className="space-y-4">
                      {category.options.map((option, optionIdx) => (
                        <motion.label 
                          key={optionIdx} 
                          className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-green-50 transition-colors"
                          whileHover={{ x: 5, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="w-6 h-6 border-2 border-gray-300 rounded-lg flex items-center justify-center relative bg-white group-hover:border-green-500 transition-colors"
                            whileHover={{ 
                              borderColor: '#059669', 
                              scale: 1.1,
                              rotate: 5
                            }}
                          >
                            <input
                              type="checkbox"
                              className="absolute opacity-0 w-full h-full cursor-pointer"
                              name={option.value}
                            />
                          </motion.div>
                          <span className="text-gray-700 flex items-center gap-2 group-hover:text-green-600 transition-colors font-medium">
                            {option.icon && (
                              <motion.span
                                whileHover={{ scale: 1.2, color: "#059669" }}
                                className="text-gray-500"
                              >
                                {option.icon}
                              </motion.span>
                            )}
                            {option.label}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Apply Filters Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(5, 150, 105, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-cyan-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-cyan-700 transition-all flex items-center justify-center font-semibold shadow-lg text-lg"
              >
                <SlidersHorizontal size={20} className="mr-2" />
                Применить фильтры
              </motion.button>
            </motion.aside>
            
            {/* Hostels Grid */}
            <div className="lg:w-3/4">
              {/* Sort Controls */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-white/50"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <motion.p 
                    className="text-gray-600 mb-2 text-lg"
                    whileInView={{ opacity: [0, 1], y: [10, 0] }}
                  >
                    Найдено <span className="font-bold text-green-600 text-2xl">{hostels.length}</span> хостелов
                  </motion.p>
                  <motion.p 
                    className="text-gray-500 text-sm"
                    whileInView={{ opacity: [0, 1], y: [5, 0] }}
                    transition={{ delay: 0.2 }}
                  >
                    Лучшие предложения для экономных путешественников
                  </motion.p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0 gap-4">
                  <span className="text-gray-700 font-medium">Вид:</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <motion.button 
                      className="p-2 rounded-md bg-white shadow-sm text-green-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Grid3X3 size={18} />
                    </motion.button>
                    <motion.button 
                      className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <LayoutGrid size={18} />
                    </motion.button>
                  </div>
                  
                  <span className="text-gray-700 font-medium">Сортировать:</span>
                  <div className="relative inline-block">
                    <motion.select 
                      className="appearance-none bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 py-3 pl-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer font-medium"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option>По популярности</option>
                      <option>По цене (низкая-высокая)</option>
                      <option>По цене (высокая-низкая)</option>
                      <option>По рейтингу</option>
                    </motion.select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Hostels Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {hostels.map((hostel, index) => (
                  <motion.div
                    key={hostel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                      <Bed className="w-16 h-16 text-white" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{hostel.name}</h3>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{hostel.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{hostel.rating}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          {hostel.amenities.map((amenity, idx) => (
                            <div key={idx} className="text-gray-500">
                              {getAmenityIcon(amenity)}
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600">
                            {hostel.price.toLocaleString()} ₸
                          </div>
                          <div className="text-sm text-gray-500">за ночь</div>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Забронировать
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Pagination */}
              <motion.div
                variants={itemVariants}
                className="mt-16 flex justify-center"
              >
                <div className="flex space-x-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-3 border border-white/50">
                  <motion.button 
                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all font-medium"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Предыдущая
                  </motion.button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <motion.button 
                      key={page}
                      className={`px-5 py-3 border rounded-xl font-medium transition-all ${
                        page === 1 
                          ? 'border-green-500 bg-gradient-to-r from-green-600 to-cyan-600 text-white' 
                          : 'border-gray-200 text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {page}
                    </motion.button>
                  ))}
                  <motion.button 
                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all font-medium"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Следующая →
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
} 