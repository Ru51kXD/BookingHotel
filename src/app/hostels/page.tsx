'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from '@/lib/motion';
import { Search, SlidersHorizontal, ChevronDown, Wifi, Coffee, Car, Tv, AirVent, Utensils, Filter, Grid3X3, LayoutGrid, Bed, MapPin, Star } from 'lucide-react';
import { getCategoryPlaceholder } from '@/lib/imageUtils';
import { useCurrency } from '@/lib/currency';

// Динамический импорт компонентов
const Navbar = dynamic(() => import('@/components/ui/Navbar'), { ssr: true });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
const HotelCard = dynamic(() => import('@/components/hotel/HotelCard'), { ssr: true });
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { ssr: false });
const AnimatedChart = dynamic(() => import('@/components/ui/AnimatedChart'), { ssr: false });

interface Hostel {
  id: number;
  name: string;
  category: string;
  city: string;
  address: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  description: string;
  amenities: string;
}

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
      { label: 'До 3000 ₽', value: 'price_1', icon: undefined },
      { label: '3000 - 6000 ₽', value: 'price_2', icon: undefined },
      { label: '6000 - 10000 ₽', value: 'price_3', icon: undefined },
      { label: 'Более 10000 ₽', value: 'price_4', icon: undefined },
    ],
  },
];

// Данные для графиков хостелов
const hostelStatsData = [
  { label: 'Бюджетные', value: 65, color: 'from-blue-500 to-cyan-500' },
  { label: 'Комфорт', value: 25, color: 'from-green-500 to-emerald-500' },
  { label: 'Премиум', value: 10, color: 'from-purple-500 to-pink-500' }
];

const cityData = [
  { label: 'Москва', value: 45, color: 'from-yellow-500 to-orange-500' },
  { label: 'Спб', value: 35, color: 'from-blue-500 to-cyan-500' },
  { label: 'Другие', value: 20, color: 'from-green-500 to-emerald-500' }
];

export default function HostelsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    maxPrice: '',
    minRating: ''
  });
  
  const { formatPrice } = useCurrency();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Параллакс эффекты для Hero секции
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Плавные анимации
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });

  // Загружаем хостелы при инициализации
  useEffect(() => {
    fetchHostels();
  }, []);

  // Обновляем результаты при изменении фильтров
  useEffect(() => {
    if (!loading) {
      fetchHostels();
    }
  }, [filters]);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      
      // Формируем параметры для API (ищем бюджетные отели)
      const params = new URLSearchParams();
      params.append('category', 'budget'); // Ищем бюджетные отели как хостелы
      
      if (filters.search) params.append('q', filters.search);
      if (filters.city) params.append('city', filters.city);

      const response = await fetch(`/api/hotels?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        let filteredHostels = data.data;
        
        // Дополнительная фильтрация по цене (хостелы обычно дешевле)
        filteredHostels = filteredHostels.filter((hotel: Hostel) => 
          hotel.price_per_night <= 15000 // Только недорогие варианты
        );
        
        if (filters.maxPrice) {
          filteredHostels = filteredHostels.filter((hotel: Hostel) => 
            hotel.price_per_night <= parseInt(filters.maxPrice)
          );
        }
        
        if (filters.minRating) {
          filteredHostels = filteredHostels.filter((hotel: Hostel) => 
            hotel.rating >= parseFloat(filters.minRating)
          );
        }

        setHostels(filteredHostels);
      } else {
        console.error('Ошибка загрузки хостелов:', data.error);
        setHostels([]);
      }
    } catch (error) {
      console.error('Ошибка загрузки хостелов:', error);
      setHostels([]);
    } finally {
      setLoading(false);
    }
  };

  const parseAmenities = (amenities: string | null | undefined): string[] => {
    if (!amenities) return [];
    
    try {
      const parsed = JSON.parse(amenities);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // Если не JSON, то обрабатываем как строку с запятыми
    }
    
    return amenities.split(',').filter(a => a.trim()).map(a => a.trim());
  };

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
    switch (amenity.toLowerCase()) {
      case 'wifi': 
      case 'wi-fi': 
        return <Wifi className="w-4 h-4" />;
      case 'breakfast':
      case 'завтрак':
        return <Coffee className="w-4 h-4" />;
      case 'parking':
      case 'парковка':
        return <Car className="w-4 h-4" />;
      default: 
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
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
            style={{ y: smoothHeroY, scale: smoothHeroY, opacity: smoothHeroOpacity }}
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
                data={cityData}
                type="bar"
                title="Города"
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
                  onClick={() => setFilters({ search: '', city: '', maxPrice: '', minRating: '' })}
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
              
              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Поиск хостелов
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Название, город..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              {/* City Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Город
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Выберите город..."
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Максимальная цена за ночь
                </label>
                <input
                  type="number"
                  placeholder="Введите сумму..."
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Минимальный рейтинг
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">Любой рейтинг</option>
                  <option value="4.5">4.5+ звезд</option>
                  <option value="4.0">4.0+ звезд</option>
                  <option value="3.5">3.5+ звезд</option>
                  <option value="3.0">3.0+ звезд</option>
                </select>
              </div>
              
              {/* Filter Sections - Удаляем старые статичные фильтры */}
              <div className="space-y-6 border-t pt-6">
                <h3 className="font-semibold text-gray-700 text-lg">
                  Популярные удобства
                </h3>
                <div className="space-y-3">
                  {['Wi-Fi', 'Кухня', 'Прачечная', 'Общая зона'].map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
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
                {loading ? (
                  // Loading State
                  Array.from({ length: 6 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="h-48 bg-gray-200 animate-pulse"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </motion.div>
                  ))
                ) : hostels.length > 0 ? (
                  hostels.map((hostel, index) => (
                    <motion.div
                      key={hostel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="h-48 relative">
                        <Image
                          src={getCategoryPlaceholder(hostel.category, 400, 192, hostel.name)}
                          alt={hostel.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                          {hostel.category}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{hostel.name}</h3>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hostel.city}, {hostel.address}</span>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex items-center mr-2">
                            {renderStars(hostel.rating)}
                          </div>
                          <span className="text-sm text-gray-600">{hostel.rating.toFixed(1)}</span>
                        </div>
                        
                        {hostel.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {hostel.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-2">
                            {parseAmenities(hostel.amenities).slice(0, 3).map((amenity, idx) => (
                              <div key={idx} className="text-gray-500" title={amenity}>
                                {getAmenityIcon(amenity) || <span className="text-xs bg-gray-100 px-2 py-1 rounded">{amenity}</span>}
                              </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              {formatPrice(hostel.price_per_night)}
                            </div>
                            <div className="text-sm text-gray-500">за ночь</div>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(`/hotel/${hostel.id}`, '_blank')}
                          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          Подробнее
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  // Empty State
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Хостелы не найдены
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Попробуйте изменить параметры поиска или фильтры
                      </p>
                      <motion.button
                        onClick={() => setFilters({ search: '', city: '', maxPrice: '', minRating: '' })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Сбросить фильтры
                      </motion.button>
                    </div>
                  </motion.div>
                )}
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