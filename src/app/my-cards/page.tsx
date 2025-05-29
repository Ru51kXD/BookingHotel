'use client';

import { motion } from '@/lib/motion';
import { User, Gift, Tag, Calendar, Clock, Plus, Copy, Check, CreditCard, Percent } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { getUserGiftCards, activateGiftCardByCode, isGiftCardValid, type UserGiftCard } from '@/lib/giftCards';

export default function MyCardsPage() {
  const { user } = useAuth();
  const [userGiftCards, setUserGiftCards] = useState<UserGiftCard[]>([]);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const giftCards = getUserGiftCards(user.email);
      setUserGiftCards(giftCards);
    }
  }, [user]);

  const handleActivateCode = () => {
    if (!user || !activationCode.trim()) return;

    const giftCard = activateGiftCardByCode(activationCode.trim(), user.email);
    if (giftCard) {
      const updatedGiftCards = getUserGiftCards(user.email);
      setUserGiftCards(updatedGiftCards);
      alert(`Код "${activationCode}" успешно активирован!`);
      setActivationCode('');
      setShowActivateModal(false);
    } else {
      alert('Код недействителен или уже использован');
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const validGiftCards = userGiftCards.filter(ugc => isGiftCardValid(ugc.giftCard) && !ugc.giftCard.isUsed);
  const usedGiftCards = userGiftCards.filter(ugc => ugc.giftCard.isUsed);

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Вход в систему</h1>
            <p className="text-gray-600">Для просмотра сертификатов необходимо войти в систему</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Мои сертификаты и промокоды</h1>
              <p className="text-xl text-gray-600">
                Управляйте своими подарочными сертификатами и промокодами
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <Gift className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{validGiftCards.length}</div>
                <div className="text-gray-600 text-sm">Активных сертификатов</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <Tag className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {validGiftCards.filter(ugc => ugc.giftCard.type === 'promo-code').length}
                </div>
                <div className="text-gray-600 text-sm">Активных промокодов</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {validGiftCards
                    .filter(ugc => ugc.giftCard.type === 'gift-card')
                    .reduce((sum, ugc) => sum + ugc.giftCard.amount, 0)
                    .toLocaleString()} ₸
                </div>
                <div className="text-gray-600 text-sm">Доступная сумма</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{usedGiftCards.length}</div>
                <div className="text-gray-600 text-sm">Использованных</div>
              </motion.div>
            </div>

            {/* Activate Code Button */}
            <div className="text-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowActivateModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Активировать код
              </motion.button>
            </div>

            {/* Active Gift Cards */}
            {validGiftCards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Активные сертификаты и промокоды</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {validGiftCards.map((userGiftCard, index) => {
                    const giftCard = userGiftCard.giftCard;
                    const isGiftCardType = giftCard.type === 'gift-card';
                    
                    return (
                      <motion.div
                        key={userGiftCard.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 ${
                          isGiftCardType ? 'border-purple-500' : 'border-blue-500'
                        }`}
                      >
                        <div className={`p-6 bg-gradient-to-r ${
                          isGiftCardType 
                            ? 'from-purple-500 to-indigo-600' 
                            : 'from-blue-500 to-cyan-600'
                        } text-white`}>
                          <div className="flex items-center justify-between mb-4">
                            {isGiftCardType ? (
                              <CreditCard className="w-8 h-8" />
                            ) : (
                              <Tag className="w-8 h-8" />
                            )}
                            <div className="text-right">
                              {isGiftCardType ? (
                                <div className="text-2xl font-bold">{giftCard.amount.toLocaleString()} ₸</div>
                              ) : (
                                <div className="text-2xl font-bold">{giftCard.discountPercent}%</div>
                              )}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{giftCard.title}</h3>
                          <p className="text-white/90 text-sm">{giftCard.description}</p>
                        </div>
                        
                        <div className="p-6">
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Код:</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyToClipboard(giftCard.code)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="Скопировать код"
                              >
                                {copiedCode === giftCard.code ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-600" />
                                )}
                              </motion.button>
                            </div>
                            <div className="font-mono font-bold text-lg text-gray-900 bg-gray-50 p-2 rounded">
                              {giftCard.code}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-500 mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              Действует до {new Date(giftCard.validUntil).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          
                          {giftCard.minOrderAmount && (
                            <div className="text-sm text-gray-600 mb-3">
                              Минимальная сумма заказа: {giftCard.minOrderAmount.toLocaleString()} ₸
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            Добавлен: {new Date(userGiftCard.addedAt).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Used Gift Cards */}
            {usedGiftCards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Использованные</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {usedGiftCards.map((userGiftCard, index) => {
                    const giftCard = userGiftCard.giftCard;
                    const isGiftCardType = giftCard.type === 'gift-card';
                    
                    return (
                      <motion.div
                        key={userGiftCard.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden opacity-75"
                      >
                        <div className="p-6 bg-gray-400 text-white">
                          <div className="flex items-center justify-between mb-4">
                            {isGiftCardType ? (
                              <CreditCard className="w-8 h-8" />
                            ) : (
                              <Tag className="w-8 h-8" />
                            )}
                            <div className="text-right">
                              {isGiftCardType ? (
                                <div className="text-2xl font-bold">{giftCard.amount.toLocaleString()} ₸</div>
                              ) : (
                                <div className="text-2xl font-bold">{giftCard.discountPercent}%</div>
                              )}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{giftCard.title}</h3>
                          <p className="text-white/90 text-sm">Использован</p>
                        </div>
                        
                        <div className="p-6">
                          <div className="font-mono font-bold text-lg text-gray-600 bg-gray-200 p-2 rounded mb-4">
                            {giftCard.code}
                          </div>
                          
                          {giftCard.usedAt && (
                            <div className="text-sm text-gray-600">
                              Использован: {new Date(giftCard.usedAt).toLocaleDateString('ru-RU')}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {validGiftCards.length === 0 && usedGiftCards.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center py-16"
              >
                <Gift className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">У вас пока нет сертификатов</h3>
                <p className="text-gray-600 mb-8">
                  Активируйте промокод или купите подарочный сертификат
                </p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowActivateModal(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Активировать код
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/gift-cards'}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Купить сертификат
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Activate Code Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Активировать код</h2>
            <p className="text-gray-600 mb-6">
              Введите код подарочного сертификата или промокода
            </p>
            
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                placeholder="Введите код"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-lg text-center"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleActivateCode();
                  }
                }}
              />
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleActivateCode}
                disabled={!activationCode.trim()}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Активировать
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowActivateModal(false);
                  setActivationCode('');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Отмена
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
} 