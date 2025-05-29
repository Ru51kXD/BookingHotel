'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Heart, Search, Filter, MapPin, Star, Trash2 } from 'lucide-react';
import HotelCard from '@/components/HotelCard';
import Footer from '@/components/ui/Footer';

interface Hotel {
  id: number | string;
  name: string;
  city: string;
  address: string;
  rating: number;
  price_per_night: number;
  category: string;
  image_url: string;
  amenities?: string[];
  description?: string;
  country?: string;
}

export default function MyFavoritesPage() {
  const { user, getLikedHotels, toggleLikeHotel } = useAuth();
  const router = useRouter();
  const [favoriteHotels, setFavoriteHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    
    loadFavoriteHotels();
  }, [user, router]);

  const loadFavoriteHotels = async () => {
    setIsLoading(true);
    try {
      const likedHotelIds = getLikedHotels();
      
      // Загружаем отели из localStorage и API
      const storedHotels = JSON.parse(localStorage.getItem('admin_hotels') || '[]');
      
      // Моковые отели из API
      const apiHotels = [
        {
          id: 1,
          name: 'Rixos President Astana',
          city: 'Астана',
          address: 'ул. Кунаева, 12/1',
          rating: 4.8,
          price_per_night: 45000,
          category: 'Отель',
          image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          description: 'Роскошный отель в центре Астаны с превосходным сервисом',
          country: 'Казахстан',
          amenities: ['wifi', 'breakfast', 'parking', 'pool', 'restaurant', 'spa']
        },
        {
          id: 2,
          name: 'Hilton Astana',
          city: 'Астана',
          address: 'ул. Сарыарка, 7',
          rating: 4.6,
          price_per_night: 38000,
          category: 'Отель',
          image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
          description: 'Современный отель с отличным сервисом и удобным расположением',
          country: 'Казахстан',
          amenities: ['wifi', 'breakfast', 'parking', 'gym', 'restaurant']
        },
        {
          id: 3,
          name: 'Ramada Plaza Astana',
          city: 'Астана',
          address: 'ул. Достык, 5',
          rating: 4.4,
          price_per_night: 32000,
          category: 'Отель',
          image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
          description: 'Комфортабельный отель в деловом центре города',
          country: 'Казахстан',
          amenities: ['wifi', 'breakfast', 'parking', 'restaurant', 'gym']
        }
      ];

      const allHotels = [...apiHotels, ...storedHotels];
      
      // Фильтруем только избранные отели
      const favorites = allHotels.filter(hotel => 
        likedHotelIds.includes(hotel.id.toString())
      );
      
      setFavoriteHotels(favorites);
    } catch (error) {
      console.error('Ошибка загрузки избранных отелей:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (hotelId: string) => {
    try {
      await toggleLikeHotel(hotelId);
      // Обновляем список после удаления
      setFavoriteHotels(prev => prev.filter(hotel => hotel.id.toString() !== hotelId));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  // Фильтрация и сортировка
  const filteredAndSortedHotels = favoriteHotels
    .filter(hotel => 
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price_per_night - b.price_per_night;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl font-bold text-white">Избранные отели</h1>
            </div>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Ваши любимые отели в одном месте
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск по названию, городу или адресу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="name">По названию</option>
                  <option value="price">По цене</option>
                  <option value="rating">По рейтингу</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hotels Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Загрузка избранных отелей...</span>
          </div>
        ) : filteredAndSortedHotels.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAndSortedHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                <HotelCard hotel={hotel} />
                
                {/* Remove from favorites button */}
                <motion.button
                  onClick={() => handleRemoveFromFavorites(hotel.id.toString())}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                  title="Удалить из избранного"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {searchTerm ? 'Отели не найдены' : 'У вас пока нет избранных отелей'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? 'Попробуйте изменить параметры поиска'
                : 'Добавляйте отели в избранное, нажимая на иконку сердечка'
              }
            </p>
            <motion.button
              onClick={() => router.push('/hotels')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Найти отели
            </motion.button>
          </motion.div>
        )}

        {/* Statistics */}
        {favoriteHotels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Статистика избранного</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {favoriteHotels.length}
                </div>
                <div className="text-gray-600">Избранных отелей</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(favoriteHotels.reduce((sum, hotel) => sum + hotel.rating, 0) / favoriteHotels.length * 10) / 10 || 0}
                </div>
                <div className="text-gray-600">Средний рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(favoriteHotels.reduce((sum, hotel) => sum + hotel.price_per_night, 0) / favoriteHotels.length).toLocaleString()} ₸
                </div>
                <div className="text-gray-600">Средняя цена</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
} 