'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import Image from 'next/image';
import { Hotel } from '@/lib/database';
import { Star, MapPin, Calendar, Users, Heart, Wifi, Car, Coffee, Waves, Utensils, Airplay, Dumbbell, Sparkles } from 'lucide-react';
import BookingModal from '@/components/BookingModal';
import { useCurrency } from '@/lib/currency';

interface HotelCardProps {
  hotel: Hotel;
  onClick: () => void;
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  console.log('🏨 HotelCard received hotel:', hotel);
  
  const { formatPrice } = useCurrency();

  // Функция для получения иконки удобства
  const getAmenityIcon = (amenityId: string) => {
    const iconMap: Record<string, { icon: any; color: string }> = {
      wifi: { icon: Wifi, color: 'text-blue-500' },
      breakfast: { icon: Coffee, color: 'text-orange-500' },
      parking: { icon: Car, color: 'text-green-500' },
      pool: { icon: Waves, color: 'text-cyan-500' },
      restaurant: { icon: Utensils, color: 'text-red-500' },
      tv: { icon: Airplay, color: 'text-purple-500' },
      gym: { icon: Dumbbell, color: 'text-gray-700' },
      spa: { icon: Sparkles, color: 'text-pink-500' }
    };
    return iconMap[amenityId] || null;
  };

  // Безопасное получение массива удобств
  const getAmenities = () => {
    if (Array.isArray(hotel.amenities)) {
      return hotel.amenities;
    }
    if (typeof hotel.amenities === 'string') {
      return hotel.amenities.split(',').map(a => a.trim());
    }
    return [];
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
  const [isLiked, setIsLiked] = useState(false);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBookingModal(true);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer group border border-gray-100"
        onClick={onClick}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageError ? getPlaceholderImage() : (hotel.image_url || getPlaceholderImage())}
            alt={hotel.name || 'Отель'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3">
            <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
              {hotel.city || 'Неизвестный город'}
            </span>
          </div>
          
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLikeClick}
              className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart 
                className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
              />
            </motion.button>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-xs font-semibold text-gray-900">{hotel.rating || 0}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Hotel Name & Category */}
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
              {hotel.name || 'Название отеля'}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(hotel.rating || 0)}
              <span className="text-xs text-gray-500 ml-1">
                ({(hotel.rating || 0).toFixed(1)})
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-1 mb-3">
            <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {hotel.address || 'Адрес не указан'}
            </span>
          </div>

          {/* Amenities Icons */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {getAmenities().slice(0, 4).map((amenityId) => {
              const amenity = getAmenityIcon(amenityId);
              if (!amenity) return null;
              
              const IconComponent = amenity.icon;
              return (
                <div key={amenityId} className="flex items-center gap-1">
                  <IconComponent className={`w-3 h-3 ${amenity.color}`} />
                </div>
              );
            })}
            {getAmenities().length > 4 && (
              <span className="text-xs text-gray-500">
                +{getAmenities().length - 4} еще
              </span>
            )}
          </div>

          {/* Price & Booking */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(hotel.price_per_night || 0)}
                </span>
              </div>
              <span className="text-xs text-gray-500">за ночь</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookingClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm"
            >
              Забронировать
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal
        hotel={hotel}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
} 