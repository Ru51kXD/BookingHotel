'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useBooking, Booking } from '@/lib/booking';
import { motion } from '@/lib/motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CreditCard,
  Download,
  X,
  AlertCircle,
  CheckCircle,
  Eye,
  Star
} from 'lucide-react';

export default function BookingsPage() {
  const { user } = useAuth();
  const { bookings, loadUserBookings, cancelBooking, isLoading } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (user) {
      loadUserBookings(user.id);
    }
  }, [user, loadUserBookings]);

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

  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'all') return true;
    return booking.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидание';
      case 'cancelled': return 'Отменено';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!user) return;
    
    setCancellingBooking(bookingId);
    try {
      const result = await cancelBooking(bookingId, user.id);
      if (result.success) {
        setSelectedBooking(null);
      } else {
        alert(result.error || 'Ошибка отмены бронирования');
      }
    } catch (error) {
      alert('Произошла ошибка');
    } finally {
      setCancellingBooking(null);
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Мои бронирования</h1>
              <p className="text-gray-600">Управляйте своими поездками</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Все бронирования</option>
                <option value="confirmed">Подтвержденные</option>
                <option value="pending">Ожидание</option>
                <option value="completed">Завершенные</option>
                <option value="cancelled">Отмененные</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filterStatus === 'all' ? 'У вас пока нет бронирований' : 'Нет бронирований с таким статусом'}
            </h3>
            <p className="text-gray-600 mb-6">
              Начните планировать свою следующую поездку!
            </p>
            <Link href="/hotels">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Найти отель
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Hotel Image */}
                    <div className="lg:w-64 h-48 lg:h-auto relative rounded-xl overflow-hidden">
                      <Image
                        src={booking.hotel.image_url}
                        alt={booking.hotel.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {booking.hotel.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{booking.hotel.address}</span>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span className="text-sm font-medium">{booking.hotel.rating}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {booking.totalPrice.toLocaleString()}₽
                          </div>
                          <div className="text-sm text-gray-600">
                            {calculateNights(booking.checkIn, booking.checkOut)} ночей
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600">Заезд</div>
                            <div className="font-medium">
                              {new Date(booking.checkIn).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600">Выезд</div>
                            <div className="font-medium">
                              {new Date(booking.checkOut).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600">Гости</div>
                            <div className="font-medium">{booking.guests} чел.</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedBooking(booking)}
                          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Подробнее
                        </motion.button>

                        {booking.status === 'confirmed' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={cancellingBooking === booking.id}
                            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                          >
                            {cancellingBooking === booking.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Отменяем...
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 mr-2" />
                                Отменить
                              </>
                            )}
                          </motion.button>
                        )}

                        {booking.paymentStatus === 'paid' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Чек
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Детали бронирования</h2>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Hotel Info */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Информация об отеле</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Название</label>
                        <p className="font-medium">{selectedBooking.hotel.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Рейтинг</label>
                        <p className="font-medium">{selectedBooking.hotel.rating} ⭐</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-gray-600">Адрес</label>
                        <p className="font-medium">{selectedBooking.hotel.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Детали бронирования</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">ID бронирования</label>
                        <p className="font-medium font-mono">{selectedBooking.id}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Статус</label>
                        <p className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(selectedBooking.status)}`}>
                          {getStatusText(selectedBooking.status)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Дата заезда</label>
                        <p className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Дата выезда</label>
                        <p className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Количество гостей</label>
                        <p className="font-medium">{selectedBooking.guests} чел.</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Количество номеров</label>
                        <p className="font-medium">{selectedBooking.rooms} шт.</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Информация об оплате</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Статус оплаты</label>
                        <p className={`inline-block px-2 py-1 rounded-full text-sm ${
                          selectedBooking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          selectedBooking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          selectedBooking.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedBooking.paymentStatus === 'paid' ? 'Оплачено' :
                           selectedBooking.paymentStatus === 'pending' ? 'Ожидание' :
                           selectedBooking.paymentStatus === 'failed' ? 'Ошибка' :
                           'Возвращено'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Общая сумма</label>
                        <p className="font-medium text-lg">{selectedBooking.totalPrice.toLocaleString()}₽</p>
                      </div>
                      {selectedBooking.paymentMethod && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-gray-600">Способ оплаты</label>
                          <p className="font-medium">
                            {selectedBooking.paymentMethod.type === 'card' ? 'Банковская карта' :
                             selectedBooking.paymentMethod.type === 'paypal' ? 'PayPal' :
                             selectedBooking.paymentMethod.type === 'apple_pay' ? 'Apple Pay' :
                             'Google Pay'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedBooking.specialRequests && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Особые пожелания</h3>
                      <p className="text-gray-700">{selectedBooking.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 