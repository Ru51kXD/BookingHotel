'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/lib/motion';
import { useCurrency } from '@/lib/currency';
import { Star, MapPin, Coffee, Wifi, Car, ChevronRight, Heart, UtensilsCrossed, Waves, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { createImageErrorHandler, getCategoryPlaceholder } from '@/lib/imageUtils';

interface HotelCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  location: string;
  description: string;
  amenities: string[];
  category?: string;
  index?: number;
}

export default function HotelCard({
  id,
  name,
  image,
  rating,
  price,
  location,
  description,
  amenities,
  category = 'hotel',
  index = 0
}: HotelCardProps) {
  const { formatPrice } = useCurrency();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const amenityIcons: { [key: string]: string } = {
    wifi: '📶',
    parking: '🚗',
    restaurant: '🍽️',
    pool: '🏊',
    gym: '💪',
    spa: '🧘',
    breakfast: '☕',
    'air-conditioning': '❄️',
    'room-service': '🛎️',
    bar: '🍺',
    'pet-friendly': '🐕',
    laundry: '👕',
    kitchen: '🍳',
    lockers: '🔒',
    'common-room': '🛋️',
    tours: '🗺️',
    events: '🎉',
    games: '🎮',
    library: '📚'
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

  const truncatedDescription = description.length > 120 
    ? `${description.slice(0, 120)}...` 
    : description;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Улучшенная заглушка для изображений
  const defaultPlaceholder = getCategoryPlaceholder(category, 400, 300, name);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full"
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Изображение отеля */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={image || defaultPlaceholder}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={createImageErrorHandler(category, 400, 300, name)}
        />
        
        {/* Рейтинг */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1 shadow-lg">
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-semibold text-gray-800 ml-1">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Категория отеля */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          {category === 'budget' ? 'Хостел' : 'Отель'}
        </div>

        {/* Цена */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
          <div className="text-right">
            <div className="text-lg font-bold text-emerald-600">
              {formatPrice(price)}
            </div>
            <div className="text-xs text-gray-600">за ночь</div>
          </div>
        </div>
      </div>

      {/* Контент карточки */}
      <div className="p-4 flex flex-col flex-1">
        {/* Заголовок и локация */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Описание */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed flex-1">
          {truncatedDescription}
        </p>

        {/* Удобства */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
              >
                {amenityIcons[amenity] && (
                  <span className="mr-1">{amenityIcons[amenity]}</span>
                )}
                {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="inline-flex items-center bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-medium">
                +{amenities.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Кнопка действия */}
        <Link href={`/hotel/${id}`}>
          <motion.button
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center shadow-sm group/btn"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Подробнее
            <motion.span
              className="ml-2"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
} 