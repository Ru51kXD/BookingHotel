'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { motion } from '@/lib/motion';
import dynamic from 'next/dynamic';
import { getCategoryPlaceholder, createImageErrorHandler } from '@/lib/imageUtils';

const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });

interface Hotel {
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

interface Category {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Состояние фильтров
  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchHotels();
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/hotels/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.search) params.append('q', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.city) params.append('city', filters.city);

      const response = await fetch(`/api/hotels?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        let filteredHotels = data.data;
        
        // Фильтрация по цене и рейтингу на клиенте
        if (filters.minPrice) {
          filteredHotels = filteredHotels.filter((hotel: Hotel) => 
            hotel.price_per_night >= parseInt(filters.minPrice)
          );
        }
        
        if (filters.maxPrice) {
          filteredHotels = filteredHotels.filter((hotel: Hotel) => 
            hotel.price_per_night <= parseInt(filters.maxPrice)
          );
        }
        
        if (filters.minRating) {
          filteredHotels = filteredHotels.filter((hotel: Hotel) => 
            hotel.rating >= parseFloat(filters.minRating)
          );
        }

        setHotels(filteredHotels);
      }
    } catch (error) {
      console.error('Ошибка загрузки отелей:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
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

  const getCategoryLabel = (category: string) => {
    const categoryItem = categories.find(c => c.value === category);
    return categoryItem ? categoryItem.label : category;
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minRating: ''
    });
  };

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
        {/* Заголовок */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Вернуться на главную
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Каталог отелей</h1>
                <p className="text-gray-600 mt-2">
                  Найдено отелей: {hotels.length}
                </p>
              </div>
              
              {/* Переключатель вида */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Боковая панель с фильтрами */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Фильтры</h2>
                  <button
                    onClick={resetFilters}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Сбросить
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Поиск */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Поиск
                    </label>
                    <input
                      type="text"
                      placeholder="Название отеля..."
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Категория */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Все категории</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Город */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город
                    </label>
                    <input
                      type="text"
                      placeholder="Город..."
                      value={filters.city}
                      onChange={(e) => setFilters({...filters, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Цена */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена за ночь (₽)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="От"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="До"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Рейтинг */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Минимальный рейтинг
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters({...filters, minRating: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Любой рейтинг</option>
                      <option value="4.5">4.5+ звезд</option>
                      <option value="4.0">4.0+ звезд</option>
                      <option value="3.5">3.5+ звезд</option>
                      <option value="3.0">3.0+ звезд</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Основное содержимое */}
            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Загрузка отелей...</p>
                  </div>
                </div>
              ) : hotels.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Отели не найдены</h3>
                  <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска</p>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-6'
                  }
                >
                  {hotels.map((hotel) => (
                    <motion.div
                      key={hotel.id}
                      variants={itemVariants}
                      className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={`/hotel/${hotel.id}`} className="block">
                        <div className={`relative ${viewMode === 'list' ? 'w-64 h-48' : 'h-48'} bg-gray-200`}>
                          <Image
                            src={hotel.image_url}
                            alt={hotel.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={createImageErrorHandler(hotel.category, 400, 200)}
                          />
                          
                          <div className="absolute top-3 right-3">
                            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                              {getCategoryLabel(hotel.category)}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {hotel.name}
                            </h3>
                            <div className="text-right ml-4">
                              <div className="text-xl font-bold text-blue-600">
                                {formatPrice(hotel.price_per_night)}
                              </div>
                              <div className="text-xs text-gray-500">за ночь</div>
                            </div>
                          </div>

                          <div className="flex items-center mb-2">
                            {renderStars(hotel.rating)}
                            <span className="ml-2 text-sm text-gray-600">
                              {hotel.rating.toFixed(1)}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{hotel.city}</span>
                          </div>

                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                            {hotel.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-1">
                            {hotel.amenities.split(',').slice(0, 3).map((amenity, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {amenity.trim()}
                              </span>
                            ))}
                            {hotel.amenities.split(',').length > 3 && (
                              <span className="text-gray-500 text-xs px-2 py-1">
                                +{hotel.amenities.split(',').length - 3} еще
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
} 