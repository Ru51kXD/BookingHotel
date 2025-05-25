'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { useAuth } from '@/lib/auth';
import { useCurrency } from '@/lib/currency';
import { useBooking, BookingService } from '@/lib/booking';
import { Hotel } from '@/lib/database';
import { 
  X, 
  Calendar, 
  Users, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Loader,
  MapPin,
  Star,
  Shield
} from 'lucide-react';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';

interface BookingModalProps {
  hotel: Hotel;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ hotel, isOpen, onClose }: BookingModalProps) {
  const { user } = useAuth();
  const { formatPrice, currency, getCurrencyInfo } = useCurrency();
  const { createBooking, processPayment } = useBooking();
  
  const [step, setStep] = useState(1); // 1: Booking details, 2: Payment, 3: Confirmation
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    specialRequests: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card' as const
  });

  // Reset state when modal opens/closes
  const handleClose = () => {
    setStep(1);
    setError('');
    setBookingId('');
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: 2,
      rooms: 1,
      specialRequests: ''
    });
    setPaymentData({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      paymentMethod: 'card'
    });
    onClose();
  };

  const calculateTotalPrice = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return hotel.price_per_night * nights * bookingData.rooms;
  };

  const handleBookingSubmit = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setError('');
    
    // Validate booking data
    const validation = BookingService.validateBookingData({
      hotel,
      ...bookingData
    });

    if (!validation.valid) {
      setError(validation.error || 'Данные бронирования некорректны');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await createBooking(user, {
        hotel,
        ...bookingData
      });

      if (result.success && result.booking) {
        setBookingId(result.booking.id);
        setStep(2);
      } else {
        setError(result.error || 'Ошибка создания бронирования');
      }
    } catch (error) {
      setError('Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const result = await processPayment(bookingId, {
        method: {
          type: paymentData.paymentMethod,
          cardNumber: paymentData.cardNumber,
          cardHolder: paymentData.cardHolder,
          expiryDate: paymentData.expiryDate,
          cvv: paymentData.cvv
        },
        amount: calculateTotalPrice(),
        currency: 'RUB',
        bookingId
      });

      if (result.success) {
        setStep(3);
      } else {
        setError(result.error || 'Ошибка обработки платежа');
      }
    } catch (error) {
      setError('Произошла ошибка при оплате');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const renderBookingForm = () => (
    <div className="space-y-6">
      {/* Hotel Info */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={hotel.image_url} 
            alt={hotel.name}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{hotel.address}</span>
            </div>
            <div className="flex items-center text-yellow-500 mt-1">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(hotel.price_per_night)}
              </span>
              <span className="text-gray-600 text-sm"> / ночь</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дата заезда
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="date"
              value={bookingData.checkIn}
              onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дата выезда
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="date"
              value={bookingData.checkOut}
              onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
              min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Количество гостей
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={bookingData.guests}
              onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} гостей</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Количество номеров
          </label>
          <select
            value={bookingData.rooms}
            onChange={(e) => setBookingData({ ...bookingData, rooms: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num} номеров</option>
            ))}
          </select>
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Особые пожелания (необязательно)
        </label>
        <textarea
          value={bookingData.specialRequests}
          onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          placeholder="Укажите ваши пожелания..."
        />
      </div>

      {/* Price Summary */}
      {bookingData.checkIn && bookingData.checkOut && (
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Цена за ночь:</span>
              <span>{formatPrice(hotel.price_per_night)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Количество ночей:</span>
              <span>{Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Количество номеров:</span>
              <span>{bookingData.rooms}</span>
            </div>
            <hr className="border-blue-200" />
            <div className="flex justify-between font-bold text-lg">
              <span>Общая стоимость:</span>
              <span>{formatPrice(calculateTotalPrice(), 'rub')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Детали бронирования</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Отель:</span>
            <span className="font-medium">{hotel.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Даты:</span>
            <span className="font-medium">
              {new Date(bookingData.checkIn).toLocaleDateString('ru-RU')} - 
              {new Date(bookingData.checkOut).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Гости:</span>
            <span className="font-medium">{bookingData.guests} чел.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Номера:</span>
            <span className="font-medium">{bookingData.rooms} шт.</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between text-lg font-bold">
            <span>К оплате:</span>
            <span>{formatPrice(calculateTotalPrice(), 'rub')}</span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Номер карты
          </label>
          <input
            type="text"
            value={paymentData.cardNumber}
            onChange={(e) => setPaymentData({
              ...paymentData,
              cardNumber: formatCardNumber(e.target.value)
            })}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            maxLength={19}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя держателя карты
          </label>
          <input
            type="text"
            value={paymentData.cardHolder}
            onChange={(e) => setPaymentData({
              ...paymentData,
              cardHolder: e.target.value.toUpperCase()
            })}
            placeholder="IVAN PETROV"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Срок действия
            </label>
            <input
              type="text"
              value={paymentData.expiryDate}
              onChange={(e) => setPaymentData({
                ...paymentData,
                expiryDate: formatExpiryDate(e.target.value)
              })}
              placeholder="MM/YY"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              maxLength={5}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="password"
              value={paymentData.cvv}
              onChange={(e) => setPaymentData({
                ...paymentData,
                cvv: e.target.value.replace(/\D/g, '')
              })}
              placeholder="123"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Безопасная оплата</p>
              <p>Ваши данные защищены 256-битным SSL шифрованием</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Бронирование подтверждено!</h3>
        <p className="text-gray-600">
          Ваше бронирование успешно создано и оплачено
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 text-left">
        <h4 className="font-semibold text-gray-900 mb-4">Детали бронирования</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ID бронирования:</span>
            <span className="font-mono font-medium">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Отель:</span>
            <span className="font-medium">{hotel.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Даты:</span>
            <span className="font-medium">
              {new Date(bookingData.checkIn).toLocaleDateString('ru-RU')} - 
              {new Date(bookingData.checkOut).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Сумма:</span>
            <span className="font-medium">{calculateTotalPrice().toLocaleString()}₽</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Подтверждение отправлено на ваш email. 
        Вы можете посмотреть детали в личном кабинете.
      </p>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {step === 1 && 'Детали бронирования'}
                        {step === 2 && 'Оплата'}
                        {step === 3 && 'Подтверждение'}
                      </h2>
                      {step < 3 && (
                        <div className="flex items-center mt-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
                            step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            1
                          </div>
                          <div className={`w-12 h-1 mx-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-2 ${
                            step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            2
                          </div>
                          <div className={`w-12 h-1 mx-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            3
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {error}
                    </motion.div>
                  )}

                  {/* Step Content */}
                  {step === 1 && renderBookingForm()}
                  {step === 2 && renderPaymentForm()}
                  {step === 3 && renderConfirmation()}

                  {/* Footer */}
                  {step < 3 && (
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                      {step > 1 ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(step - 1)}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                        >
                          Назад
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={step === 1 ? handleBookingSubmit : handlePaymentSubmit}
                        disabled={isLoading}
                        className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70"
                      >
                        {isLoading ? (
                          <>
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            {step === 1 ? 'Создание...' : 'Оплата...'}
                          </>
                        ) : (
                          <>
                            {step === 1 ? 'Продолжить к оплате' : 'Оплатить'}
                            {step === 2 && (
                              <CreditCard className="w-5 h-5 ml-2" />
                            )}
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClose}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                      >
                        Закрыть
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
} 