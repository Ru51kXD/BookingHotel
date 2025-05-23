'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react';
import { motion } from '@/lib/motion';
import Image from 'next/image';
import { createPlaceholderImage, createImageErrorHandler } from '@/lib/imageUtils';

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

interface HotelSearchProps {
  className?: string;
}

export default function HotelSearch({ className = '' }: HotelSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Загружаем категории при инициализации
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const searchHotels = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedCity) params.append('city', selectedCity);

      const response = await fetch(`/api/hotels?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setHotels(data.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Ошибка поиска отелей:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery || selectedCategory || selectedCity) {
      searchHotels();
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

  return (
    <div className={`bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 ${className}`}>
      {/* Заголовок */}
      <div className="text-center mb-8">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
        >
          Найдите идеальный отель
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600"
        >
          Более 80 отелей и хостелов в России
        </motion.p>
      </div>

      {/* Форма поиска */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Строка поиска */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Категория */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-gray-50/50 hover:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Город */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Город..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        {/* Кнопка поиска */}
        <motion.button
          onClick={handleSearch}
          disabled={loading}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Поиск...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Найти отели
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Быстрые категории */}
      {!showResults && (
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Популярные категории
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  // Автоматически ищем при выборе категории
                  setTimeout(() => searchHotels(), 100);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-2xl text-center transition-all duration-300 group border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <div className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {category.label}
                </div>
                <div className="text-xs text-gray-500 mt-1 group-hover:text-blue-500 transition-colors duration-200">
                  {category.description}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Результаты поиска */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Найдено отелей: {hotels.length}
            </h4>
            <button
              onClick={() => setShowResults(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Скрыть результаты
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => window.open(`/hotel/${hotel.id}`, '_blank')}
              >
                <div className="w-20 h-20 relative rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <Image
                    src={hotel.image_url}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    onError={createImageErrorHandler(hotel.category, 80, 80)}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-semibold text-gray-900 line-clamp-1">
                      {hotel.name}
                    </h5>
                    <div className="flex items-center space-x-1 ml-2">
                      {renderStars(hotel.rating)}
                      <span className="text-sm text-gray-600 ml-1">
                        {hotel.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">
                    📍 {hotel.city}, {hotel.address}
                  </p>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {hotel.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(hotel.price_per_night)}
                      <span className="text-sm text-gray-500 font-normal">/ночь</span>
                    </span>
                    
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {categories.find(c => c.value === hotel.category)?.label || hotel.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hotels.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Отели не найдены. Попробуйте изменить параметры поиска.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
} 