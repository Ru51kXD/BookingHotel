'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/lib/motion';
import { useCurrency } from '@/lib/currency';
import { Star, MapPin, Coffee, Wifi, Car, ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';

interface HotelCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  location: string;
  description: string;
  amenities: string[];
  index?: number; // Для анимации с задержкой
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
  index = 0
}: HotelCardProps) {
  const { formatPrice } = useCurrency();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // Иконки для основных удобств
  const amenityIcons: Record<string, React.ReactElement> = {
    'wifi': <Wifi size={14} />,
    'breakfast': <Coffee size={14} />,
    'parking': <Car size={14} />,
    'pool': <span className="text-sm">🏊</span>,
    'spa': <span className="text-sm">🧖</span>,
    'gym': <span className="text-sm">💪</span>,
    'kitchen': <span className="text-sm">🍳</span>,
    'lockers': <span className="text-sm">🔒</span>,
    'laundry': <span className="text-sm">👕</span>,
    'restaurant': <span className="text-sm">🍽️</span>,
    'bar': <span className="text-sm">🍸</span>,
    'tours': <span className="text-sm">🗺️</span>,
    'beach': <span className="text-sm">🏖️</span>
  };

  // Упрощенные анимации для лучшей производительности
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Обрезаем описание, если оно слишком длинное
  const truncatedDescription = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  // Заглушка для изображений
  const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlmYTZiNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhvdGVsPC90ZXh0Pjwvc3ZnPg==';

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
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gray-100">
          <Image
            src={imageFailed ? defaultImage : image}
            alt={name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageFailed(true);
              setImageLoaded(true);
            }}
            priority={index < 3}
          />
          
          {/* Скелетон загрузки */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400 text-lg">📷</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Бейдж с рейтингом */}
        <motion.div 
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-sm font-semibold flex items-center shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Star className="h-3 w-3 mr-1 text-yellow-500" fill="currentColor" />
          {rating}
        </motion.div>

        {/* Кнопка избранного */}
        <motion.button
          className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-gray-600 p-2 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1, color: '#ef4444' }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="h-4 w-4" />
        </motion.button>

        {/* Цена */}
        <motion.div 
          className="absolute bottom-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-lg font-semibold shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          {formatPrice(price)}
          <span className="text-xs font-normal text-emerald-100 ml-1">/ночь</span>
        </motion.div>
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