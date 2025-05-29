'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useCurrency } from '@/lib/currency';
import { motion } from '@/lib/motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Star, 
  Calendar, 
  Users,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { Hotel } from '@/lib/database';

export default function FavoritesPage() {
  const { user, getLikedHotels, toggleLikeHotel } = useAuth();
  const { formatPrice } = useCurrency();
  const [favoriteHotels, setFavoriteHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    if (user) {
      loadFavoriteHotels();
    }
  }, [user]);

  const loadFavoriteHotels = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const likedHotelIds = getLikedHotels();
      
      if (likedHotelIds.length === 0) {
        setFavoriteHotels([]);
        setIsLoading(false);
        return;
      }

      // Загружаем данные отелей из API
      const response = await fetch('/api/hotels');
      const data = await response.json();
      
      if (data.success) {
        const liked = data.data.filter((hotel: Hotel) => 
          likedHotelIds.includes(hotel.id.toString())
        );
        setFavoriteHotels(liked);
      }
    } catch (error) {
      console.error('Ошибка загрузки избранных отелей:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (hotelId: string) => {
    try {
      await toggleLikeHotel(hotelId);
      setFavoriteHotels(prev => prev.filter(hotel => hotel.id.toString() !== hotelId));
    } catch (error) {
      console.error('Ошибка удаления из избранного:', error);
    }
  };

  const filteredAndSortedHotels = favoriteHotels
    .filter(hotel => 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price_per_night - b.price_per_night;
        case 'rating':
          return b.rating - a.rating;
        case 'city':
          return a.city.localeCompare(b.city);
        default:
          return 0;
      }
    });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Пожалуйста, войдите в систему</p>
          <Link href="/account" className="text-blue-600 hover:underline">
            Войти в аккаунт
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/account"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад в личный кабинет
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Heart className="w-8 h-8 text-red-500 mr-3 fill-current" />
                Избранные отели
              </h1>
              <p className="text-gray-600">
                {favoriteHotels.length} {favoriteHotels.length === 1 ? 'отель' : 'отелей'} в избранном
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        {favoriteHotels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white rounded-xl shadow-sm p-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Поиск по названию или городу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">По названию</option>
                  <option value="price">По цене</option>
                  <option value="rating">По рейтингу</option>
                  <option value="city">По городу</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Favorites List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredAndSortedHotels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'Ничего не найдено' : 'У вас пока нет избранных отелей'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'Попробуйте изменить параметры поиска'
                : 'Добавляйте отели в избранное, нажимая на сердечко ❤️'
              }
            </p>
            {!searchQuery && (
              <Link href="/hotels">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Найти отели
                </motion.button>
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
                      alt={hotel.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Remove from favorites button */}
                    <motion.button
                      onClick={() => handleRemoveFromFavorites(hotel.id.toString())}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Удалить из избранного"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>

                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {hotel.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {hotel.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {hotel.city}, {hotel.address}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(hotel.price_per_night)}
                      </span>
                      <span className="text-gray-600 text-sm"> / ночь</span>
                    </div>
                    
                    <Link href={`/hotel/${hotel.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                      >
                        Подробнее
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 