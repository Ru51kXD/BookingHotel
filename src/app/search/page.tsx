'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from '@/lib/motion';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Filter,
  Map,
  List,
  RefreshCw,
  X
} from 'lucide-react';

// Динамический импорт компонентов
const HotelCard = dynamic(() => import('@/components/HotelCard'), { ssr: true });
const HotelMap = dynamic(() => import('@/components/HotelMap'), { ssr: true });

// Расширенные данные для поиска с заглушками изображений
const allResults = [
  {
    id: 1,
    name: 'Гранд Плаза',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyYW5kIFBsYXphPC90ZXh0Pjwvc3ZnPg==',
    rating: 4.8,
    price: 6500,
    location: 'Москва, центр',
    description: 'Роскошный отель в сердце Москвы с превосходным сервисом',
    amenities: ['wifi', 'breakfast', 'parking', 'pool', 'spa'],
    type: 'hotels',
    city: 'москва'
  },
  {
    id: 2,
    name: 'Хостел Метро',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhvc3RlbCBNZXRybzwvdGV4dD48L3N2Zz4=',
    rating: 4.6,
    price: 1200,
    location: 'Москва, метро Сокольники',
    description: 'Современный хостел с отличным расположением',
    amenities: ['wifi', 'kitchen', 'laundry', 'lockers'],
    type: 'hostels',
    city: 'москва'
  },
  {
    id: 3,
    name: 'Комфорт Инн',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWZvcnQgSW5uPC90ZXh0Pjwvc3ZnPg==',
    rating: 4.5,
    price: 4200,
    location: 'Москва, Арбат',
    description: 'Уютный отель в историческом районе',
    amenities: ['wifi', 'breakfast', 'restaurant'],
    type: 'hotels',
    city: 'москва'
  },
  {
    id: 4,
    name: 'BackPacker Hub',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVmM2Y0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJhY2tQYWNrZXIgSHViPC90ZXh0Pjwvc3ZnPg==',
    rating: 4.8,
    price: 950,
    location: 'Санкт-Петербург, Арбат',
    description: 'Уютный хостел в центре города',
    amenities: ['wifi', 'kitchen', 'bar', 'tours', 'breakfast'],
    type: 'hostels',
    city: 'санкт-петербург'
  },
  {
    id: 5,
    name: 'Панорама Отель',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBhbm9yYW1hIEhvdGVsPC90ZXh0Pjwvc3ZnPg==',
    rating: 4.7,
    price: 5800,
    location: 'Сочи, набережная',
    description: 'Отель с видом на море',
    amenities: ['wifi', 'breakfast', 'pool', 'spa', 'beach'],
    type: 'hotels',
    city: 'сочи'
  },
  {
    id: 6,
    name: 'Эконом Хостел',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVjb25vbSBIb3N0ZWw8L3RleHQ+PC9zdmc+',
    rating: 4.3,
    price: 800,
    location: 'Казань, центр',
    description: 'Бюджетное размещение в центре',
    amenities: ['wifi', 'kitchen', 'lockers'],
    type: 'hostels',
    city: 'казань'
  }
];

// Фильтры
const priceRanges = [
  { label: 'До 2000 ₽', value: '0-2000' },
  { label: '2000 - 5000 ₽', value: '2000-5000' },
  { label: '5000 - 10000 ₽', value: '5000-10000' },
  { label: 'Более 10000 ₽', value: '10000+' }
];

const accommodationTypes = [
  { label: 'Отели', value: 'hotels' },
  { label: 'Хостелы', value: 'hostels' },
  { label: 'Апартаменты', value: 'apartments' },
  { label: 'Гостевые дома', value: 'guesthouses' }
];

const amenities = [
  { label: 'Бесплатный Wi-Fi', value: 'wifi' },
  { label: 'Завтрак включен', value: 'breakfast' },
  { label: 'Парковка', value: 'parking' },
  { label: 'Бассейн', value: 'pool' },
  { label: 'Спа-центр', value: 'spa' },
  { label: 'Фитнес-центр', value: 'gym' },
  { label: 'Кухня', value: 'kitchen' },
  { label: 'Шкафчики', value: 'lockers' },
  { label: 'Прачечная', value: 'laundry' }
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: '',
    accommodationType: '',
    selectedAmenities: [] as string[],
    sortBy: 'popularity'
  });
  
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Получаем параметры из URL
  useEffect(() => {
    if (searchParams) {
      const destination = searchParams.get('destination') || '';
      setSearchFilters(prev => ({
        ...prev,
        destination: destination,
        checkIn: searchParams.get('checkIn') || '',
        checkOut: searchParams.get('checkOut') || '',
        guests: parseInt(searchParams.get('guests') || '1')
      }));
      
      // Если есть destination, сразу ищем
      if (destination) {
        searchHotels(destination);
      }
    }
  }, [searchParams]);

  // Функция поиска отелей через API
  const searchHotels = async (query: string = searchFilters.destination) => {
    console.log('🔍 Searching for:', query);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/hotels?q=${encodeURIComponent(query)}`);
      console.log('📡 Response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        console.log('📦 API Result:', result);
        console.log('🏨 Hotels count:', result.data?.length || 0);
        // API возвращает {success: true, data: [...], count: number}
        setSearchResults(result.data || []);
      } else {
        console.error('Error fetching hotels:', response.status);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching hotels:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Фильтрация результатов (теперь для данных из API)
  const filteredResults = (Array.isArray(searchResults) ? searchResults : []).filter(hotel => {
    // Фильтр по цене
    if (searchFilters.priceRange) {
      const [min, max] = searchFilters.priceRange.split('-').map(p => p.replace('+', ''));
      if (max === '') {
        if (hotel.price_per_night < parseInt(min)) return false;
      } else {
        if (hotel.price_per_night < parseInt(min) || hotel.price_per_night > parseInt(max)) return false;
      }
    }

    // Фильтр по удобствам
    if (searchFilters.selectedAmenities.length > 0) {
      const hotelAmenities = (hotel.amenities || '').toLowerCase();
      return searchFilters.selectedAmenities.some(amenity => {
        switch (amenity) {
          case 'wifi': return hotelAmenities.includes('wi-fi') || hotelAmenities.includes('wifi');
          case 'breakfast': return hotelAmenities.includes('завтрак') || hotelAmenities.includes('breakfast');
          case 'parking': return hotelAmenities.includes('парковка') || hotelAmenities.includes('parking');
          case 'pool': return hotelAmenities.includes('бассейн') || hotelAmenities.includes('pool');
          case 'spa': return hotelAmenities.includes('спа') || hotelAmenities.includes('spa');
          default: return hotelAmenities.includes(amenity);
        }
      });
    }

    return true;
  });

  // Сортировка результатов
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (searchFilters.sortBy) {
      case 'price-low':
        return (a.price_per_night || 0) - (b.price_per_night || 0);
      case 'price-high':
        return (b.price_per_night || 0) - (a.price_per_night || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default: // popularity
        return (b.rating || 0) - (a.rating || 0);
    }
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleSearch = () => {
    searchHotels(searchFilters.destination);
  };

  const handleFilterChange = (field: string, value: string | number) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setSearchFilters(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  };

  const clearFilters = () => {
    setSearchFilters(prev => ({
      ...prev,
      priceRange: '',
      accommodationType: '',
      selectedAmenities: []
    }));
  };

  return (
    <>
      {/* Компактный Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Заголовок */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Поиск жилья
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Найдите идеальное место для отдыха по всему миру
            </p>

            {/* Форма поиска */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Место назначения */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Куда поедем?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchFilters.destination}
                      onChange={(e) => handleFilterChange('destination', e.target.value)}
                      placeholder="Город или отель"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Дата заезда */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заезд
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={searchFilters.checkIn}
                      onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Дата выезда */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выезд
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={searchFilters.checkOut}
                      onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Кнопка поиска */}
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Найти</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Расширенная форма поиска */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-8 bg-white shadow-lg -mt-8 relative z-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            {/* Основная форма поиска */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <motion.div 
                className="md:col-span-2"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-gray-700 font-medium mb-2">Куда едем?</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchFilters.destination}
                    onChange={(e) => handleFilterChange('destination', e.target.value)}
                    placeholder="Город, отель или район"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <label className="block text-gray-700 font-medium mb-2">Заезд</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={searchFilters.checkIn}
                    onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <label className="block text-gray-700 font-medium mb-2">Выезд</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={searchFilters.checkOut}
                    onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </motion.div>

              <motion.button
                onClick={handleSearch}
                disabled={isLoading}
                className={`py-3 px-6 rounded-xl font-bold text-white flex items-center justify-center shadow-lg transition-all ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                }`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Поиск...' : 'Найти'}
              </motion.button>
            </div>

            {/* Фильтры */}
            <motion.div variants={itemVariants} className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <Filter className="mr-2 h-5 w-5 text-emerald-600" />
                  Фильтры
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-emerald-600 text-sm font-medium hover:text-emerald-800 transition-colors"
                >
                  Сбросить все
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Цена */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Цена за ночь</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <motion.label 
                        key={index}
                        className="flex items-center cursor-pointer group"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={searchFilters.priceRange === range.value}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="w-4 h-4 text-emerald-600 mr-2"
                        />
                        <span className="text-gray-700 group-hover:text-emerald-600 transition-colors text-sm">
                          {range.label}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Тип размещения */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Тип размещения</h4>
                  <div className="space-y-2">
                    {accommodationTypes.map((type, index) => (
                      <motion.label 
                        key={index}
                        className="flex items-center cursor-pointer group"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="radio"
                          name="accommodationType"
                          value={type.value}
                          checked={searchFilters.accommodationType === type.value}
                          onChange={(e) => handleFilterChange('accommodationType', e.target.value)}
                          className="w-4 h-4 text-emerald-600 mr-2"
                        />
                        <span className="text-gray-700 group-hover:text-emerald-600 transition-colors text-sm">
                          {type.label}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Удобства */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Удобства</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {amenities.map((amenity, index) => (
                      <motion.label 
                        key={index}
                        className="flex items-center cursor-pointer group"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="checkbox"
                          value={amenity.value}
                          checked={searchFilters.selectedAmenities.includes(amenity.value)}
                          onChange={() => toggleAmenity(amenity.value)}
                          className="w-4 h-4 text-emerald-600 mr-2 rounded"
                        />
                        <span className="text-gray-700 group-hover:text-emerald-600 transition-colors text-sm">
                          {amenity.label}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Сортировка */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Сортировка</h4>
                  <select
                    value={searchFilters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
                  >
                    <option value="popularity">По популярности</option>
                    <option value="price-low">Цена: по возрастанию</option>
                    <option value="price-high">Цена: по убыванию</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </div>
              </div>

              {/* Активные фильтры */}
              {(searchFilters.priceRange || searchFilters.accommodationType || searchFilters.selectedAmenities.length > 0) && (
                <motion.div 
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {searchFilters.priceRange && (
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      {priceRanges.find(r => r.value === searchFilters.priceRange)?.label}
                      <button 
                        onClick={() => handleFilterChange('priceRange', '')}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {searchFilters.accommodationType && (
                    <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      {accommodationTypes.find(t => t.value === searchFilters.accommodationType)?.label}
                      <button 
                        onClick={() => handleFilterChange('accommodationType', '')}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {searchFilters.selectedAmenities.map(amenity => (
                    <span key={amenity} className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      {amenities.find(a => a.value === amenity)?.label}
                      <button 
                        onClick={() => toggleAmenity(amenity)}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Результаты поиска */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-12 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          {/* Заголовок результатов */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Результаты поиска
              </h2>
              <p className="text-gray-600">
                Найдено <span className="font-bold text-emerald-600">{sortedResults.length}</span> вариантов размещения
              </p>
            </div>

            {/* Переключатель вида */}
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <span className="text-gray-700 font-medium">Вид:</span>
              <div className="flex bg-white rounded-lg p-1 shadow-md border border-gray-200">
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List size={18} />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'map' 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Map size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Список результатов */}
          {viewMode === 'list' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {sortedResults.map((result, index) => (
                <HotelCard
                  key={result.id}
                  hotel={result}
                  onClick={() => {
                    console.log('Clicked hotel:', result);
                    // Переход к странице отеля
                    window.location.href = `/hotel/${result.id}`;
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Вид карты */}
          {viewMode === 'map' && (
            <motion.div 
              variants={itemVariants}
              className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg border border-emerald-200"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <HotelMap 
                  hotels={sortedResults.map(result => ({
                    id: result.id,
                    name: result.name,
                    city: result.city,
                    address: result.address,
                    price_per_night: result.price_per_night,
                    rating: result.rating,
                    image_url: result.image_url,
                    category: result.category,
                    description: result.description,
                    amenities: result.amenities,
                    created_at: result.created_at
                  }))}
                />
              </div>
            </motion.div>
          )}

          {/* Пустые результаты */}
          {sortedResults.length === 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Ничего не найдено</h3>
              <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска или фильтры</p>
              <button
                onClick={clearFilters}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Сбросить фильтры
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="pt-24">
      <Suspense fallback={<div>Загрузка...</div>}>
        <SearchPageContent />
      </Suspense>
    </div>
  );
} 