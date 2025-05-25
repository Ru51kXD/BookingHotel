'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from '@/lib/motion';
import { Search, Filter, Grid, List, ArrowLeft, MapPin, Star, Map } from 'lucide-react';
import HotelCard from '@/components/HotelCard';
import HotelMap from '@/components/HotelMap';
import { getCategoryPlaceholder, createImageErrorHandler } from '@/lib/imageUtils';
import { Hotel } from '@/lib/database';
import { useCurrency, CurrencyUtils } from '@/lib/currency';

interface Category {
  value: string;
  label: string;
  description: string;
  icon: string;
}

export default function HotelsPage() {
  const searchParams = useSearchParams();
  
  const { formatPrice } = useCurrency();
  
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
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
      
      // Загружаем отели из localStorage (созданные через админку)
      const storedHotels = localStorage.getItem('admin_hotels');
      let hotelsFromStorage: Hotel[] = [];
      
      if (storedHotels) {
        hotelsFromStorage = JSON.parse(storedHotels).map((hotel: any) => ({
          ...hotel,
          id: hotel.id.toString(), // Приводим к строке для совместимости
          // Адаптируем поля если нужно
          latitude: hotel.latitude || 0,
          longitude: hotel.longitude || 0
        }));
      }
      
      // Загружаем отели из API
      let apiHotels: Hotel[] = [];
      try {
        const params = new URLSearchParams();
        
        if (filters.search) params.append('q', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.city) params.append('city', filters.city);

        const response = await fetch(`/api/hotels?${params.toString()}`);
        const data = await response.json();
        
        if (data.success) {
          apiHotels = data.data;
        }
      } catch (apiError) {
        console.log('API недоступно, используем только localStorage');
      }
      
      // Объединяем отели из localStorage и API
      const allHotels = [...hotelsFromStorage, ...apiHotels];
      
      // Удаляем дубликаты по id (приоритет у localStorage)
      const uniqueHotels = allHotels.filter((hotel, index, self) => 
        index === self.findIndex((h) => h.id.toString() === hotel.id.toString())
      );
      
      let filteredHotels = uniqueHotels;
      
      // Применяем фильтры
      if (filters.search) {
        filteredHotels = filteredHotels.filter((hotel: Hotel) => 
          hotel.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          hotel.city.toLowerCase().includes(filters.search.toLowerCase()) ||
          hotel.address.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredHotels = filteredHotels.filter((hotel: Hotel) => 
          hotel.category === filters.category
        );
      }
      
      if (filters.city) {
        filteredHotels = filteredHotels.filter((hotel: Hotel) => 
          hotel.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }
      
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
    } catch (error) {
      console.error('Ошибка загрузки отелей:', error);
    } finally {
      setLoading(false);
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

  const handleHotelSelect = (hotel: Hotel) => {
    window.location.href = `/hotel/${hotel.id}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24">
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
              <div className="flex items-center space-x-4">
                {/* Подсказка о карте */}
                {viewMode === 'map' && (
                  <div className="hidden lg:block bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                    💡 Кликните на маркеры городов, чтобы посмотреть отели
                  </div>
                )}
                
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="Вид сетки"
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
                    title="Вид списка"
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'map' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="Вид карты"
                  >
                    <Map className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {viewMode === 'map' ? (
            // Вид карты - полноэкранный
            <div className="h-[calc(100vh-200px)]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Загрузка карты...</p>
                  </div>
                </div>
              ) : (
                <HotelMap 
                  hotels={hotels} 
                  onHotelSelect={handleHotelSelect}
                />
              )}
            </div>
          ) : (
            // Обычный вид с боковой панелью фильтров
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
                        Страна/Город
                      </label>
                      <input
                        type="text"
                        placeholder="Страна или город..."
                        value={filters.city}
                        onChange={(e) => setFilters({...filters, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Цена */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Цена за ночь (в текущей валюте)
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
                      <p className="text-xs text-gray-500 mt-1">
                        Цены автоматически конвертируются в выбранную валюту
                      </p>
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
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'
                        : 'space-y-4'
                    }
                  >
                    {hotels.map((hotel) => (
                      <motion.div
                        key={hotel.id}
                        variants={itemVariants}
                      >
                        <HotelCard
                          hotel={hotel}
                          onClick={() => window.location.href = `/hotel/${hotel.id}`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 