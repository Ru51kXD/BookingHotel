'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import Image from 'next/image';
import { Hotel } from '@/lib/database';
import { Star, MapPin, Calendar, Users, Heart, Wifi, Car, Coffee, Waves, Utensils, Airplay, Dumbbell, Sparkles } from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import { useCurrency } from '@/lib/currency';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';

interface HotelCardProps {
  hotel: Hotel;
  className?: string;
}

const amenityIcons: { [key: string]: any } = {
  wifi: Wifi,
  breakfast: Coffee,
  parking: Car,
  pool: Waves,
  restaurant: Utensils,
  tv: Airplay,
  gym: Dumbbell,
  spa: Sparkles
};

const amenityLabels: { [key: string]: string } = {
  wifi: 'Wi-Fi',
  breakfast: 'Завтрак',
  parking: 'Парковка',
  pool: 'Бассейн',
  restaurant: 'Ресторан',
  tv: 'ТВ',
  gym: 'Спортзал',
  spa: 'СПА'
};

export default function HotelCard({ hotel, className = '' }: HotelCardProps) {
  const { formatPrice } = useCurrency();
  const { user, toggleLikeHotel, getLikedHotels } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  
  const likedHotels = getLikedHotels();
  const isLiked = likedHotels.includes(hotel.id.toString());

  // Безопасная обработка amenities
  const getAmenities = () => {
    if (!hotel.amenities) return [];
    
    if (Array.isArray(hotel.amenities)) {
      return hotel.amenities;
    }
    
    if (typeof hotel.amenities === 'string') {
      try {
        return hotel.amenities.split(',').map(a => a.trim());
      } catch {
        return [];
      }
    }
    
    return [];
  };

  const amenities = getAmenities();

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Войдите в систему, чтобы добавлять отели в избранное');
      return;
    }

    setIsLiking(true);
    try {
      await toggleLikeHotel(hotel.id.toString());
    } catch (error) {
      console.error('Ошибка при изменении лайка:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Проверяем, что hotel существует и имеет необходимые поля
  if (!hotel || !hotel.id) {
    console.log('❌ Hotel validation failed:', { hotel, hasId: hotel?.id });
    return (
      <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center animate-pulse">
        <span className="text-gray-500">Загрузка...</span>
      </div>
    );
  }

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBookingModal(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getPlaceholderImage = () => {
    const placeholders = [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=300&fit=crop&auto=format'
    ];
    const index = hotel.id % placeholders.length;
    return placeholders[index];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      <Link href={`/hotel/${hotel.id}`}>
        <div className="relative">
          {/* Изображение отеля */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageError ? getPlaceholderImage() : (hotel.image_url || getPlaceholderImage())}
              alt={hotel.name || 'Отель'}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              onError={handleImageError}
            />
            
            {/* Кнопка лайка */}
            <motion.button
              onClick={handleLikeToggle}
              disabled={isLiking}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
                isLiked 
                  ? 'bg-red-500/90 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart 
                className={`w-5 h-5 transition-all ${
                  isLiked ? 'fill-current' : ''
                } ${isLiking ? 'animate-pulse' : ''}`} 
              />
            </motion.button>

            {/* Категория */}
            <div className="absolute top-4 left-4">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {hotel.category}
              </span>
            </div>
          </div>

          {/* Информация об отеле */}
          <div className="p-6">
            {/* Название и рейтинг */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1 mr-2">
                {hotel.name}
              </h3>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-semibold text-yellow-700">
                  {hotel.rating}
                </span>
              </div>
            </div>

            {/* Местоположение */}
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm line-clamp-1">
                {hotel.address}, {hotel.city}
                {hotel.country && hotel.country !== hotel.city && `, ${hotel.country}`}
              </span>
            </div>

            {/* Удобства */}
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {amenities.slice(0, 4).map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity];
                  const label = amenityLabels[amenity] || amenity;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-lg"
                      title={label}
                    >
                      {IconComponent && (
                        <IconComponent className="w-3 h-3 text-gray-600 mr-1" />
                      )}
                      <span className="text-xs text-gray-600">{label}</span>
                    </div>
                  );
                })}
                {amenities.length > 4 && (
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                    <span className="text-xs text-gray-600">
                      +{amenities.length - 4} еще
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Описание */}
            {hotel.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {hotel.description}
              </p>
            )}

            {/* Цена */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-indigo-600">
                  {formatPrice(hotel.price_per_night || 0)}
                </span>
                <span className="text-gray-500 text-sm ml-1">за ночь</span>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Подробнее
              </motion.div>
            </div>
          </div>
        </div>
      </Link>

      {/* Booking Modal */}
      <BookingModal
        hotel={hotel}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </motion.div>
  );
} 