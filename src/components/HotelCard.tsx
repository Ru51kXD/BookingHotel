'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion';
import Image from 'next/image';
import { Hotel } from '@/lib/database';
import { Star, MapPin } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

interface HotelCardProps {
  hotel: Hotel;
  onClick: () => void;
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowBookingModal(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={hotel.image_url}
            alt={hotel.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
              {hotel.city}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-sm font-bold flex items-center">
              <Star className="w-4 h-4 mr-1" />
              {hotel.rating}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{hotel.address}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-gray-900">
              {hotel.price_per_night.toLocaleString()}₽
              <span className="text-base font-normal text-gray-600"> / ночь</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookingClick}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Забронировать
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              Подробнее
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