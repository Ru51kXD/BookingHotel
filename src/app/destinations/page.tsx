'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, ArrowLeft, Search, Globe, Users } from 'lucide-react';
import { motion } from '@/lib/motion';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });

interface Destination {
  id: number;
  name: string;
  country: string;
  continent: string;
  image: string;
  hotels: number;
  rating: number;
  description: string;
  highlights: string[];
  bestTime: string;
  averagePrice: number;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Париж',
    country: 'Франция',
    continent: 'Европа',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop&auto=format',
    hotels: 2847,
    rating: 4.8,
    description: 'Город света и романтики с неповторимой архитектурой',
    highlights: ['Эйфелева башня', 'Лувр', 'Нотр-Дам', 'Елисейские поля'],
    bestTime: 'Апрель-Октябрь',
    averagePrice: 150
  },
  {
    id: 2,
    name: 'Токио',
    country: 'Япония',
    continent: 'Азия',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop&auto=format',
    hotels: 1923,
    rating: 4.9,
    description: 'Современная японская столица с уникальной культурой',
    highlights: ['Сибуя', 'Храм Сенсо-дзи', 'Гинза', 'Токийская башня'],
    bestTime: 'Март-Май, Сентябрь-Ноябрь',
    averagePrice: 120
  },
  {
    id: 3,
    name: 'Нью-Йорк',
    country: 'США',
    continent: 'Северная Америка',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop&auto=format',
    hotels: 3156,
    rating: 4.7,
    description: 'Город, который никогда не спит, мегаполис возможностей',
    highlights: ['Статуя Свободы', 'Центральный парк', 'Бродвей', 'Манхэттен'],
    bestTime: 'Апрель-Июнь, Сентябрь-Ноябрь',
    averagePrice: 200
  },
  {
    id: 4,
    name: 'Лондон',
    country: 'Великобритания',
    continent: 'Европа',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop&auto=format',
    hotels: 2341,
    rating: 4.6,
    description: 'Историческая британская столица с богатым наследием',
    highlights: ['Биг-Бен', 'Букингемский дворец', 'Лондонский Тауэр', 'Темза'],
    bestTime: 'Май-Сентябрь',
    averagePrice: 180
  },
  {
    id: 5,
    name: 'Дубай',
    country: 'ОАЭ',
    continent: 'Азия',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&auto=format',
    hotels: 1876,
    rating: 4.8,
    description: 'Роскошный город будущего в пустыне',
    highlights: ['Бурдж-Халифа', 'Пальма Джумейра', 'Дубай Молл', 'Золотой рынок'],
    bestTime: 'Ноябрь-Март',
    averagePrice: 250
  },
  {
    id: 6,
    name: 'Рим',
    country: 'Италия',
    continent: 'Европа',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop&auto=format',
    hotels: 1654,
    rating: 4.7,
    description: 'Вечный город с богатой историей и культурой',
    highlights: ['Колизей', 'Ватикан', 'Фонтан Треви', 'Пантеон'],
    bestTime: 'Апрель-Июнь, Сентябрь-Октябрь',
    averagePrice: 130
  },
  {
    id: 7,
    name: 'Бали',
    country: 'Индонезия',
    continent: 'Азия',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop&auto=format',
    hotels: 987,
    rating: 4.9,
    description: 'Тропический рай с прекрасными пляжами',
    highlights: ['Убуд', 'Храм Танах Лот', 'Вулкан Батур', 'Семиньяк'],
    bestTime: 'Апрель-Октябрь',
    averagePrice: 80
  },
  {
    id: 8,
    name: 'Сидней',
    country: 'Австралия',
    continent: 'Океания',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop&auto=format',
    hotels: 1234,
    rating: 4.6,
    description: 'Жемчужина Австралии с живописной гаванью',
    highlights: ['Оперный театр', 'Харбор-Бридж', 'Бонди Бич', 'Рокс'],
    bestTime: 'Сентябрь-Ноябрь, Март-Май',
    averagePrice: 160
  },
  {
    id: 9,
    name: 'Барселона',
    country: 'Испания',
    continent: 'Европа',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop&auto=format',
    hotels: 1567,
    rating: 4.7,
    description: 'Каталонская жемчужина с архитектурой Гауди',
    highlights: ['Саграда Фамилия', 'Парк Гуэль', 'Ла Рамбла', 'Готический квартал'],
    bestTime: 'Май-Июнь, Сентябрь-Октябрь',
    averagePrice: 140
  },
  {
    id: 10,
    name: 'Стамбул',
    country: 'Турция',
    continent: 'Европа/Азия',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop&auto=format',
    hotels: 1876,
    rating: 4.5,
    description: 'Город на стыке Европы и Азии с богатой историей',
    highlights: ['Айя-София', 'Голубая мечеть', 'Галата', 'Босфор'],
    bestTime: 'Апрель-Май, Сентябрь-Ноябрь',
    averagePrice: 90
  },
  {
    id: 11,
    name: 'Сингапур',
    country: 'Сингапур',
    continent: 'Азия',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop&auto=format',
    hotels: 654,
    rating: 4.8,
    description: 'Современный город-государство в Юго-Восточной Азии',
    highlights: ['Marina Bay', 'Gardens by the Bay', 'Чайнатаун', 'Сентоза'],
    bestTime: 'Февраль-Апрель',
    averagePrice: 170
  },
  {
    id: 12,
    name: 'Мальдивы',
    country: 'Мальдивы',
    continent: 'Азия',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    hotels: 145,
    rating: 4.9,
    description: 'Тропический рай с кристально чистой водой',
    highlights: ['Водные виллы', 'Коралловые рифы', 'Дайвинг', 'Спа-курорты'],
    bestTime: 'Ноябрь-Апрель',
    averagePrice: 400
  }
];

export default function DestinationsPage() {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const continents = ['Все', 'Европа', 'Азия', 'Северная Америка', 'Океания'];

  const filteredDestinations = destinations
    .filter(dest => {
      const matchesSearch = searchQuery === '' || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = selectedContinent === '' || selectedContinent === 'Все' || 
        dest.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.averagePrice - b.averagePrice;
        case 'hotels':
          return b.hotels - a.hotels;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Вернуться на главную
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Мировые направления
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Откройте для себя самые популярные туристические направления планеты
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <Globe className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">190+</h3>
                  <p className="text-white/80">Стран</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">50M+</h3>
                  <p className="text-white/80">Путешественников</p>
                </div>
                <div className="text-center">
                  <Star className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <p className="text-white/80">Средний рейтинг</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Поиск */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Поиск направления..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Континент */}
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {continents.map((continent) => (
                  <option key={continent} value={continent === 'Все' ? '' : continent}>
                    {continent}
                  </option>
                ))}
              </select>

              {/* Сортировка */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">По рейтингу</option>
                <option value="price">По цене</option>
                <option value="hotels">По количеству отелей</option>
                <option value="name">По алфавиту</option>
              </select>

              {/* Результаты */}
              <div className="flex items-center text-gray-600">
                <span className="font-medium">
                  Найдено: {filteredDestinations.length} направлений
                </span>
              </div>
            </div>
          </div>

          {/* Список направлений */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64">
                  <Image
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {destination.continent}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{destination.country}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        от ${destination.averagePrice}
                      </div>
                      <div className="text-xs text-gray-500">за ночь</div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Основные достопримечательности:</p>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="text-gray-500 text-xs px-2 py-1">
                          +{destination.highlights.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {destination.hotels.toLocaleString()} отелей
                    </div>
                    <div className="text-sm text-gray-600">
                      Лучшее время: {destination.bestTime}
                    </div>
                  </div>

                  <Link href={`/hotels?city=${encodeURIComponent(destination.name)}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Найти отели
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Направления не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
} 