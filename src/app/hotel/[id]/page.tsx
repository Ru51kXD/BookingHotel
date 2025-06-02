'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Star, Wifi, Car, Utensils, Coffee, Dumbbell, Shield, Phone, Heart } from 'lucide-react';
import { motion } from '@/lib/motion';
import { useCurrency } from '@/lib/currency';
import { createPlaceholderImage, createImageErrorHandler } from '@/lib/imageUtils';
import { useAuth } from '@/lib/auth';
import BookingModal from '@/components/BookingModal';

interface Hotel {
  id: number | string;
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

export default function HotelDetailPage() {
  const params = useParams();
  const { formatPrice } = useCurrency();
  const { user, toggleLikeHotel, getLikedHotels } = useAuth();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  
  const likedHotels = getLikedHotels();
  const isLiked = hotel ? likedHotels.includes(hotel.id.toString()) : false;

  useEffect(() => {
    if (params.id) {
      fetchHotel(params.id as string);
    }
  }, [params.id]);

  const fetchHotel = async (id: string) => {
    try {
      setLoading(true);
      
      // Сначала проверяем localStorage для отелей, созданных через админку
      const storedHotels = localStorage.getItem('admin_hotels');
      if (storedHotels) {
        const hotelsFromStorage = JSON.parse(storedHotels);
        const foundHotel = hotelsFromStorage.find((hotel: any) => hotel.id.toString() === id);
        
        if (foundHotel) {
          // Адаптируем данные отеля из localStorage к ожидаемому формату
          const adaptedHotel = {
            id: foundHotel.id,
            name: foundHotel.name,
            category: foundHotel.category,
            city: foundHotel.city,
            address: foundHotel.address,
            price_per_night: foundHotel.price_per_night,
            rating: foundHotel.rating,
            image_url: foundHotel.image_url,
            description: foundHotel.description || `Добро пожаловать в ${foundHotel.name}! Этот замечательный ${foundHotel.category} расположен в ${foundHotel.city} и предлагает комфортабельное размещение с отличным сервисом.`,
            amenities: foundHotel.amenities ? foundHotel.amenities.join(', ') : 'Wi-Fi, Парковка'
          };
          
          setHotel(adaptedHotel);
          setLoading(false);
          return;
        }
      }
      
      // Если не найден в localStorage, пытаемся загрузить из API
      const response = await fetch(`/api/hotels/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setHotel(data.data);
      } else {
        setError(data.error || 'Отель не найден');
      }
    } catch (err) {
      setError('Ошибка загрузки данных отеля');
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAmenityIcon = (amenity: string) => {
    const normalizedAmenity = amenity.toLowerCase().trim();
    
    if (normalizedAmenity.includes('wifi') || normalizedAmenity.includes('wi-fi')) return <Wifi className="w-5 h-5" />;
    if (normalizedAmenity.includes('parking') || normalizedAmenity.includes('парковка')) return <Car className="w-5 h-5" />;
    if (normalizedAmenity.includes('restaurant') || normalizedAmenity.includes('ресторан')) return <Utensils className="w-5 h-5" />;
    if (normalizedAmenity.includes('breakfast') || normalizedAmenity.includes('завтрак')) return <Coffee className="w-5 h-5" />;
    if (normalizedAmenity.includes('gym') || normalizedAmenity.includes('фитнес')) return <Dumbbell className="w-5 h-5" />;
    if (normalizedAmenity.includes('spa') || normalizedAmenity.includes('спа')) return <Shield className="w-5 h-5" />;
    if (normalizedAmenity.includes('tv') || normalizedAmenity.includes('телевизор')) return <Phone className="w-5 h-5" />;
    if (normalizedAmenity.includes('pool') || normalizedAmenity.includes('бассейн')) return <Shield className="w-5 h-5" />;
    
    return <Shield className="w-5 h-5" />;
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'luxury': 'Роскошный',
      'business': 'Бизнес',
      'budget': 'Бюджетный',
      'resort': 'Курортный',
      'boutique': 'Бутик'
    };
    return categories[category] || category;
  };

  const handleBookNow = () => {
    if (!user) {
      alert('Пожалуйста, войдите в систему для бронирования');
      return;
    }
    setShowBookingModal(true);
  };

  const handleToggleFavorite = async () => {
    if (!hotel) return;
    
    if (!user) {
      alert('Пожалуйста, войдите в систему, чтобы добавлять отели в избранное');
      return;
    }

    setIsLiking(true);
    try {
      await toggleLikeHotel(hotel.id.toString());
    } catch (error) {
      console.error('Ошибка при изменении избранного:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка информации об отеле...</p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏨</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Отель не найден</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Вернуться на главную
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Вернуться на главную
          </Link>
        </div>
      </div>

      {/* Основное содержимое */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Изображение отеля */}
          <div className="relative h-96 bg-gray-200">
            <Image
              src={hotel.image_url}
              alt={hotel.name}
              fill
              className="object-cover"
              priority
              onError={createImageErrorHandler(hotel.category, 800, 400)}
            />
            
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {getCategoryLabel(hotel.category)}
              </span>
            </div>
          </div>

          {/* Информация об отеле */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h1>
                
                <div className="flex items-center mb-3">
                  {renderStars(hotel.rating)}
                  <span className="ml-2 text-lg font-semibold text-gray-700">
                    {hotel.rating.toFixed(1)}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{hotel.city}, {hotel.address}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {formatPrice(hotel.price_per_night)}
                </div>
                <div className="text-gray-500">за ночь</div>
              </div>
            </div>

            {/* Описание */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {hotel.description}
              </p>
            </div>

            {/* Удобства */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Удобства</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotel.amenities.split(',').map((amenity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-3 text-gray-700">{amenity.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Действия */}
            <div className="border-t pt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleBookNow}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Забронировать сейчас
                </motion.button>
                
                <motion.button
                  onClick={handleToggleFavorite}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLiking}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2
                    ${isLiked 
                      ? 'bg-red-50 text-red-600 border-2 border-red-500' 
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''} ${isLiking ? 'animate-pulse' : ''}`} />
                  {isLiked ? 'В избранном' : 'Добавить в избранное'}
                </motion.button>
              </div>
              
              <div className="mt-4 text-center text-gray-500 text-sm">
                Бесплатная отмена до 24 часов до заезда
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {hotel && (
        <BookingModal
          hotel={hotel}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
} 