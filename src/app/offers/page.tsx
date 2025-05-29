'use client';

import { motion } from '@/lib/motion';
import { Tag, Clock, Star, MapPin, Calendar, Gift, Percent, Copy, Check, Plus, ShoppingCart } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useState } from 'react';
import { activateGiftCardByCode, getAvailablePromoCodes } from '@/lib/giftCards';
import { addOfferUsage } from '@/lib/admin';
import { useAuth } from '@/lib/auth';
import SuccessAnimation from '@/components/ui/SuccessAnimation';

export default function OffersPage() {
  const { user } = useAuth();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activatedCodes, setActivatedCodes] = useState<string[]>([]);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [successDetails, setSuccessDetails] = useState({ code: '', discount: 0 });

  const offers = [
    {
      id: 1,
      title: 'Раннее бронирование',
      description: 'Скидка 25% при бронировании за 30 дней',
      discount: 25,
      validUntil: '2024-12-31',
      hotels: ['Rixos President Astana', 'Hilton Astana', 'Marriott Astana'],
      image: '/images/offer1.jpg',
      code: 'EARLY25'
    },
    {
      id: 2,
      title: 'Выходные в Алматы',
      description: 'Специальные цены на уикенд',
      discount: 15,
      validUntil: '2024-11-30',
      hotels: ['InterContinental Almaty', 'Rixos Almaty', 'Dostyk Hotel'],
      image: '/images/offer2.jpg',
      code: 'WEEKEND15'
    },
    {
      id: 3,
      title: 'Длительное пребывание',
      description: 'При бронировании от 7 ночей',
      discount: 30,
      validUntil: '2024-12-15',
      hotels: ['Все отели сети StayEasy'],
      image: '/images/offer3.jpg',
      code: 'LONGSTAY30'
    }
  ];

  const seasonalOffers = [
    {
      title: 'Зимние каникулы',
      period: 'Декабрь - Январь',
      discount: '20%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Весенние скидки',
      period: 'Март - Май',
      discount: '15%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Летний отдых',
      period: 'Июнь - Август',
      discount: '25%',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Осенние предложения',
      period: 'Сентябрь - Ноябрь',
      discount: '18%',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activatePromoCode = (code: string) => {
    if (!user) {
      alert('Для активации промокода необходимо войти в систему');
      return;
    }

    const giftCard = activateGiftCardByCode(code, user.email);
    if (giftCard) {
      setActivatedCodes(prev => [...prev, code]);
      setSuccessDetails({ code, discount: giftCard.discountPercent || 0 });
      setShowSuccessAnimation(true);
    } else {
      alert('Промокод уже использован или недействителен');
    }
  };

  const useOffer = (offer: typeof offers[0]) => {
    if (!user) {
      alert('Для использования предложения необходимо войти в систему');
      return;
    }

    // Сохраняем использование предложения в админской системе
    addOfferUsage({
      userId: user.email,
      userEmail: user.email,
      offerCode: offer.code,
      offerTitle: offer.title,
      discountAmount: offer.discount,
      orderAmount: 0 // Будет заполнено при реальном бронировании
    });

    // Активируем промокод
    activatePromoCode(offer.code);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6"
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Специальные предложения</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Лучшие скидки и акции для ваших путешествий. Экономьте до 30% на бронировании отелей!
              </p>
            </div>
            
            {/* Основные предложения */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center relative">
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{offer.discount}%
                    </div>
                    <Tag className="w-16 h-16 text-white" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    
                    <div className="flex items-center text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">Действует до {new Date(offer.validUntil).toLocaleDateString('ru-RU')}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Участвующие отели:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {offer.hotels.map((hotel, idx) => (
                          <li key={idx} className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-400" />
                            {hotel}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Промокод */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Промокод:</span>
                          <div className="font-mono font-bold text-lg text-indigo-600">{offer.code}</div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(offer.code)}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                            title="Скопировать код"
                          >
                            {copiedCode === offer.code ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-600" />
                            )}
                          </motion.button>
                          {user && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => activatePromoCode(offer.code)}
                              disabled={activatedCodes.includes(offer.code)}
                              className={`p-2 rounded-lg transition-colors ${
                                activatedCodes.includes(offer.code)
                                  ? 'bg-green-200 text-green-600'
                                  : 'bg-indigo-200 hover:bg-indigo-300 text-indigo-600'
                              }`}
                              title={activatedCodes.includes(offer.code) ? 'Активирован' : 'Добавить в профиль'}
                            >
                              {activatedCodes.includes(offer.code) ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => useOffer(offer)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Воспользоваться предложением
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Сезонные предложения */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
                <Percent className="w-8 h-8 mr-3 text-orange-600" />
                Сезонные акции
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {seasonalOffers.map((offer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${offer.color} rounded-xl p-6 text-white text-center hover:scale-105 transition-transform`}
                  >
                    <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{offer.period}</p>
                    <div className="text-3xl font-bold">{offer.discount}</div>
                    <div className="text-sm opacity-90">скидка</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Активация промокода */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-16"
              >
                <h2 className="text-3xl font-bold mb-4 text-center">Есть промокод?</h2>
                <p className="text-center text-white/90 mb-6">
                  Активируйте промокод и он автоматически добавится в ваш профиль
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          if (input.value.trim()) {
                            activatePromoCode(input.value.trim());
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                        if (input?.value.trim()) {
                          activatePromoCode(input.value.trim());
                          input.value = '';
                        }
                      }}
                      className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Активировать
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Условия акций */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Условия участия в акциях</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Общие условия:</h3>
                  <ul className="text-gray-600 space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>Скидки не суммируются с другими акциями</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>Предложения действительны при наличии свободных номеров</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>Отмена и изменение бронирования согласно политике отеля</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span>Скидки применяются к базовой стоимости номера</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Как получить скидку:</h3>
                  <div className="space-y-4">
                    {[
                      'Выберите отель из списка участников',
                      'Укажите промокод при бронировании',
                      'Скидка автоматически применится к итоговой сумме',
                      'Оплатите бронирование со скидкой'
                    ].map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-600 mt-1">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2 text-lg">Ограниченное время</h4>
                    <p className="text-yellow-700">
                      Количество номеров по акционным ценам ограничено. 
                      Бронируйте заранее, чтобы не упустить выгодные предложения!
                    </p>
                  </div>
                </div>
              </div>

              {!user && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <div className="text-center">
                    <h4 className="font-semibold text-blue-800 mb-2 text-lg">Войдите в систему</h4>
                    <p className="text-blue-700">
                      Для активации промокодов и их сохранения в профиле необходимо войти в систему
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Success Animation */}
      <SuccessAnimation
        isVisible={showSuccessAnimation}
        onClose={() => setShowSuccessAnimation(false)}
        type="offer"
        title="Предложение активировано!"
        message="Промокод добавлен в ваш профиль и готов к использованию"
        details={`Код: ${successDetails.code} • Скидка: ${successDetails.discount}%`}
      />

      <Footer />
    </>
  );
} 