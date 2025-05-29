'use client';

import { motion } from '@/lib/motion';
import { Gift, CreditCard, Heart, Star, Calendar, Check, ArrowRight, ShoppingCart, User, Mail, Phone } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useState } from 'react';
import { purchaseGiftCard } from '@/lib/giftCards';
import { addGiftCardPurchase } from '@/lib/admin';
import { useAuth } from '@/lib/auth';
import SuccessAnimation from '@/components/ui/SuccessAnimation';

export default function GiftCardsPage() {
  const { user } = useAuth();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [successDetails, setSuccessDetails] = useState({ code: '', amount: 0 });
  const [purchaseData, setPurchaseData] = useState({
    recipientName: '',
    recipientEmail: '',
    message: '',
    senderName: '',
    senderEmail: ''
  });

  const cardTypes = [
    {
      id: 1,
      name: 'Классическая',
      amount: 10000,
      description: 'Идеальный подарок для коротких поездок',
      color: 'from-blue-500 to-cyan-500',
      features: ['Действует 12 месяцев', 'Можно использовать частями', 'Подходит для любых отелей']
    },
    {
      id: 2,
      name: 'Премиум',
      amount: 25000,
      description: 'Для незабываемых путешествий',
      color: 'from-purple-500 to-indigo-500',
      features: ['Действует 18 месяцев', 'Бонус 5% к номиналу', 'Приоритетная поддержка']
    },
    {
      id: 3,
      name: 'VIP',
      amount: 50000,
      description: 'Роскошный отдых в лучших отелях',
      color: 'from-yellow-500 to-orange-500',
      features: ['Действует 24 месяца', 'Бонус 10% к номиналу', 'Персональный менеджер']
    }
  ];

  const benefits = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Идеальный подарок',
      description: 'Подарите незабываемые впечатления вместо обычных вещей'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Гибкость использования',
      description: 'Можно использовать в любое удобное время в течение срока действия'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Широкий выбор',
      description: 'Подходит для всех отелей и хостелов в нашей сети'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Особые моменты',
      description: 'Создайте особенные воспоминания для ваших близких'
    }
  ];

  const handlePurchase = (cardType: typeof cardTypes[0]) => {
    if (!user) {
      alert('Для покупки подарочного сертификата необходимо войти в систему');
      return;
    }
    setSelectedCard(cardType.id);
    setShowPurchaseModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPurchaseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const completePurchase = () => {
    if (!user || !selectedCard) return;

    const cardType = cardTypes.find(c => c.id === selectedCard);
    if (!cardType) return;

    try {
      // Создаем подарочный сертификат
      const giftCard = purchaseGiftCard(cardType.amount, user.email);
      
      // Сохраняем покупку в админской системе
      addGiftCardPurchase({
        purchaserId: user.email,
        purchaserEmail: user.email,
        cardType: cardType.name,
        amount: cardType.amount,
        recipientName: purchaseData.recipientName || user.email,
        recipientEmail: purchaseData.recipientEmail || user.email,
        message: purchaseData.message,
        giftCardCode: giftCard.code
      });

      // Показываем анимацию успеха
      setSuccessDetails({ code: giftCard.code, amount: cardType.amount });
      setShowSuccessAnimation(true);
      
      setShowPurchaseModal(false);
      setSelectedCard(null);
      setPurchaseData({
        recipientName: '',
        recipientEmail: '',
        message: '',
        senderName: '',
        senderEmail: ''
      });
    } catch (error) {
      alert('Произошла ошибка при покупке сертификата. Попробуйте еще раз.');
    }
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-red-600 rounded-full mb-6"
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Подарочные карты</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Подарите незабываемые путешествия! Наши подарочные карты - это идеальный способ 
                порадовать близких возможностью выбрать свой идеальный отдых.
              </p>
            </div>

            {/* Card Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {cardTypes.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`h-32 bg-gradient-to-r ${card.color} flex items-center justify-center relative`}>
                    <CreditCard className="w-12 h-12 text-white" />
                    <div className="absolute top-4 right-4 text-white font-bold text-lg">
                      {card.amount.toLocaleString()} ₸
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.name}</h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {card.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePurchase(card)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Купить карту
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Преимущества подарочных карт</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Как это работает</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    title: 'Выберите карту',
                    description: 'Выберите подходящий номинал и оформите покупку'
                  },
                  {
                    step: 2,
                    title: 'Получите код',
                    description: 'Код сертификата сразу появится в вашем профиле'
                  },
                  {
                    step: 3,
                    title: 'Используйте при бронировании',
                    description: 'Введите код при оплате и получите скидку'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Готовы сделать подарок?</h2>
              <p className="text-xl text-white/90 mb-8">
                Выберите подарочную карту и подарите незабываемые впечатления уже сегодня!
              </p>
              {!user && (
                <p className="text-white/80 mb-4">
                  Для покупки подарочных сертификатов необходимо войти в систему
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Покупка подарочного сертификата</h2>
            
            {(() => {
              const card = cardTypes.find(c => c.id === selectedCard);
              return card ? (
                <div className="mb-6">
                  <div className={`h-20 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                    <CreditCard className="w-8 h-8 text-white mr-3" />
                    <div className="text-white">
                      <div className="font-bold">{card.name}</div>
                      <div className="text-sm">{card.amount.toLocaleString()} ₸</div>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Имя получателя
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={purchaseData.recipientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Для кого подарок"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email получателя
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={purchaseData.recipientEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Email для отправки сертификата"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение (необязательно)
                </label>
                <textarea
                  name="message"
                  value={purchaseData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Поздравление или пожелание"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={completePurchase}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Купить сертификат
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowPurchaseModal(false);
                  setSelectedCard(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Отмена
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Animation */}
      <SuccessAnimation
        isVisible={showSuccessAnimation}
        onClose={() => setShowSuccessAnimation(false)}
        type="gift-card"
        title="Сертификат успешно приобретен!"
        message="Подарочный сертификат добавлен в ваш профиль"
        details={`Код: ${successDetails.code} • Сумма: ${successDetails.amount.toLocaleString()} ₸`}
      />

      <Footer />
    </>
  );
} 