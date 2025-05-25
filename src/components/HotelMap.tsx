'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion';
import { MapPin, Star, ExternalLink, Navigation } from 'lucide-react';
import { Hotel } from '@/lib/database';
import { useCurrency } from '@/lib/currency';

interface HotelMapProps {
  hotels: Hotel[];
  onHotelSelect: (hotel: Hotel) => void;
}

// Координаты для основных городов (для демонстрации)
const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  'Москва': { lat: 55.7558, lng: 37.6176 },
  'Санкт-Петербург': { lat: 59.9311, lng: 30.3609 },
  'Нью-Йорк': { lat: 40.7128, lng: -74.0060 },
  'Париж': { lat: 48.8566, lng: 2.3522 },
  'Лондон': { lat: 51.5074, lng: -0.1278 },
  'Токио': { lat: 35.6762, lng: 139.6503 },
  'Барселона': { lat: 41.3851, lng: 2.1734 },
  'Рим': { lat: 41.9028, lng: 12.4964 },
  'Берлин': { lat: 52.5200, lng: 13.4050 },
  'Мадрид': { lat: 40.4168, lng: -3.7038 },
  'Сочи': { lat: 43.6028, lng: 39.7342 },
  'Лос-Анджелес': { lat: 34.0522, lng: -118.2437 },
  'Майами': { lat: 25.7617, lng: -80.1918 },
  'Севилья': { lat: 37.3891, lng: -5.9845 },
  'Канны': { lat: 43.5528, lng: 7.0174 },
  'Венеция': { lat: 45.4408, lng: 12.3155 },
  'Позитано': { lat: 40.6280, lng: 14.4850 },
  'Баден-Баден': { lat: 48.7606, lng: 8.2370 },
  'Бали': { lat: -8.3405, lng: 115.0920 }
};

export default function HotelMap({ hotels, onHotelSelect }: HotelMapProps) {
  const { formatPrice } = useCurrency();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 55.7558, lng: 37.6176 }); // По умолчанию Москва

  // Группируем отели по городам для лучшего отображения
  const hotelsByCity = hotels.reduce((acc, hotel) => {
    if (!acc[hotel.city]) {
      acc[hotel.city] = [];
    }
    acc[hotel.city].push(hotel);
    return acc;
  }, {} as { [key: string]: Hotel[] });

  // Определяем центр карты на основе первого отеля
  useEffect(() => {
    if (hotels.length > 0) {
      const firstCity = hotels[0].city;
      const coords = cityCoordinates[firstCity];
      if (coords) {
        setMapCenter(coords);
      }
    }
  }, [hotels]);

  const handleCityClick = (city: string, cityHotels: Hotel[]) => {
    const coords = cityCoordinates[city];
    if (coords) {
      setMapCenter(coords);
      if (cityHotels.length === 1) {
        setSelectedHotel(cityHotels[0]);
      }
    }
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
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
      {/* Заглушка карты с интерактивными точками */}
      <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
        {/* Имитация карты мира */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1000 600" className="w-full h-full">
            {/* Простые очертания континентов */}
            <path
              d="M200,150 Q250,120 300,140 Q350,160 380,200 Q360,250 320,280 Q280,290 240,270 Q200,240 180,200 Z"
              fill="currentColor"
              className="text-green-300"
            />
            <path
              d="M450,180 Q500,160 550,170 Q580,190 590,230 Q570,270 530,290 Q480,280 450,250 Z"
              fill="currentColor" 
              className="text-green-300"
            />
            <path
              d="M650,200 Q700,180 750,200 Q780,230 770,270 Q740,300 700,290 Q660,280 640,240 Z"
              fill="currentColor"
              className="text-green-300"
            />
          </svg>
        </div>

        {/* Отметки городов на карте */}
        {Object.entries(hotelsByCity).map(([city, cityHotels]) => {
          const coords = cityCoordinates[city];
          if (!coords) return null;

          // Конвертируем координаты в позицию на экране (примерно)
          const x = ((coords.lng + 180) / 360) * 100;
          const y = ((90 - coords.lat) / 180) * 100;

          return (
            <motion.div
              key={city}
              className="absolute cursor-pointer group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCityClick(city, cityHotels)}
            >
              {/* Пульсирующий маркер */}
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-30"></div>
                
                {/* Количество отелей */}
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cityHotels.length}
                </div>
                
                {/* Подсказка при наведении */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {city} ({cityHotels.length} отелей)
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Легенда */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Карта отелей</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Города с отелями</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Найдено отелей: {hotels.length}
          </div>
        </div>

        {/* Элементы управления картой */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors"
          >
            <Navigation className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Боковая панель с выбранным отелем */}
      {selectedHotel && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl overflow-y-auto"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">Информация об отеле</h3>
              <button
                onClick={() => setSelectedHotel(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Изображение отеля */}
              <div className="relative h-40 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={selectedHotel.image_url}
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop&auto=format';
                  }}
                />
              </div>

              {/* Информация об отеле */}
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{selectedHotel.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(selectedHotel.rating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({selectedHotel.rating.toFixed(1)})
                  </span>
                </div>
                <div className="flex items-start gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{selectedHotel.address}</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{selectedHotel.description}</p>
              </div>

              {/* Цена */}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(selectedHotel.price_per_night, 'rub')}
                    </div>
                    <div className="text-sm text-gray-500">за ночь</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onHotelSelect(selectedHotel)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Выбрать
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Список отелей внизу */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t">
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Отели на карте</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {hotels.slice(0, 6).map((hotel) => (
              <motion.div
                key={hotel.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedHotel(hotel)}
                className="flex-shrink-0 w-60 bg-white rounded-lg shadow-md p-3 cursor-pointer border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={hotel.image_url}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop&auto=format';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{hotel.name}</h4>
                    <div className="flex items-center gap-1 my-1">
                      {renderStars(hotel.rating)}
                    </div>
                    <div className="text-sm font-semibold text-blue-600">
                      {formatPrice(hotel.price_per_night, 'rub')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {hotels.length > 6 && (
              <div className="flex-shrink-0 w-20 flex items-center justify-center text-gray-500 text-sm">
                +{hotels.length - 6} еще
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 