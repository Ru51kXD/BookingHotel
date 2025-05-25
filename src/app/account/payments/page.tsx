'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { usePayments, AddCardData, PaymentCard } from '@/lib/payments';
import { motion } from '@/lib/motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CreditCard, 
  Plus, 
  Trash2, 
  Shield,
  CheckCircle,
  Star,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

export default function PaymentsPage() {
  const { user } = useAuth();
  const { cards, isLoading: cardsLoading, loadUserCards, addCard, removeCard, setDefaultCard } = usePayments();
  
  const [showAddCard, setShowAddCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [message, setMessage] = useState('');
  const [cardError, setCardError] = useState('');
  const [newCard, setNewCard] = useState<AddCardData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    isDefault: false
  });

  useEffect(() => {
    if (user?.id) {
      loadUserCards(user.id);
    }
  }, [user?.id, loadUserCards]);

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

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return (
          <div className="w-12 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
            VISA
          </div>
        );
      case 'mastercard':
        return (
          <div className="w-12 h-8 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold">
            MC
          </div>
        );
      case 'mir':
        return (
          <div className="w-12 h-8 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">
            МИР
          </div>
        );
      case 'amex':
        return (
          <div className="w-12 h-8 bg-gray-700 rounded text-white flex items-center justify-center text-xs font-bold">
            AMEX
          </div>
        );
      default:
        return (
          <div className="w-12 h-8 bg-gray-400 rounded text-white flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
        );
    }
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCardError('');

    try {
      const result = await addCard(user.id, newCard);
      if (result.success) {
        setShowAddCard(false);
        setNewCard({
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: '',
          isDefault: false
        });
        setMessage('Карта успешно добавлена!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setCardError(result.error || 'Ошибка при добавлении карты');
      }
    } catch (error) {
      setCardError('Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту карту?')) return;

    try {
      const result = await removeCard(user.id, cardId);
      if (result.success) {
        setMessage('Карта успешно удалена!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Ошибка при удалении карты');
    }
  };

  const handleSetDefault = async (cardId: string) => {
    try {
      const result = await setDefaultCard(user.id, cardId);
      if (result.success) {
        setMessage('Основная карта изменена!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Ошибка при изменении основной карты');
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Способы оплаты</h1>
              <p className="text-gray-600">Управляйте своими банковскими картами</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowAddCard(true);
                setCardError('');
              }}
              className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Добавить карту
            </motion.button>
          </div>
        </motion.div>

        {/* Success/Error Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">{message}</span>
            </div>
          </motion.div>
        )}

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Безопасность платежей</h3>
              <p className="text-blue-800 text-sm">
                Все данные карт шифруются и хранятся в соответствии с международными стандартами PCI DSS. 
                Мы не храним данные CVV кода вашей карты.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cards List */}
        <div className="space-y-6">
          {cardsLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Загружаем ваши карты...</p>
            </motion.div>
          ) : cards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl shadow-lg"
            >
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Нет сохраненных карт</h3>
              <p className="text-gray-600 mb-6">
                Добавьте банковскую карту для быстрой оплаты бронирований
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAddCard(true);
                  setCardError('');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Добавить первую карту
              </motion.button>
            </motion.div>
          ) : (
            cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getCardIcon(card.type)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {card.cardNumber}
                        </span>
                        {card.isDefault && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Основная
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {card.cardHolder} • {card.expiryDate}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Добавлена {new Date(card.created_at).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!card.isDefault && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSetDefault(card.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all"
                      >
                        Сделать основной
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Payment Methods Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Принимаемые способы оплаты</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              {getCardIcon('visa')}
              <span className="text-sm font-medium">Visa</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              {getCardIcon('mastercard')}
              <span className="text-sm font-medium">Mastercard</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              {getCardIcon('mir')}
              <span className="text-sm font-medium">МИР</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              {getCardIcon('amex')}
              <span className="text-sm font-medium">American Express</span>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-3 text-sm text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Безопасные платежи с шифрованием SSL</span>
          </div>
        </motion.div>

        {/* Add Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Добавить карту</h2>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Error Message */}
                {cardError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-medium">{cardError}</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleAddCard} className="space-y-6">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Номер карты
                    </label>
                    <div className="relative">
                      <input
                        type={showCardNumber ? 'text' : 'password'}
                        value={newCard.cardNumber}
                        onChange={(e) => setNewCard({
                          ...newCard,
                          cardNumber: formatCardNumber(e.target.value)
                        })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        maxLength={19}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCardNumber ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя держателя карты
                    </label>
                    <input
                      type="text"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({
                        ...newCard,
                        cardHolder: e.target.value.toUpperCase()
                      })}
                      placeholder="IVAN PETROV"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Срок действия
                      </label>
                      <input
                        type="text"
                        value={newCard.expiryDate}
                        onChange={(e) => setNewCard({
                          ...newCard,
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
                        value={newCard.cvv}
                        onChange={(e) => setNewCard({
                          ...newCard,
                          cvv: e.target.value.replace(/\D/g, '')
                        })}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Default Card */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={newCard.isDefault}
                      onChange={(e) => setNewCard({
                        ...newCard,
                        isDefault: e.target.checked
                      })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                      Сделать основной картой
                    </label>
                  </div>

                  {/* Security Note */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-gray-900 mb-1">Безопасность</p>
                        <p>Данные карты шифруются и защищены по стандартам PCI DSS. CVV код не сохраняется.</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Добавляем карту...
                      </>
                    ) : (
                      'Добавить карту'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 