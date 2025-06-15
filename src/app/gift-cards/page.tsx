'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Gift } from 'lucide-react';
import { purchaseGiftCard, GiftCard } from '@/lib/giftCards';
import { useAuth } from '@/lib/auth';
import { toast } from 'react-hot-toast';

const giftCardAmounts = [
  { amount: 10000, title: 'Базовый' },
  { amount: 25000, title: 'Стандарт' },
  { amount: 50000, title: 'Премиум' },
  { amount: 100000, title: 'VIP' }
];

export default function GiftCardsPage() {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Пожалуйста, войдите в систему для покупки сертификата');
      return;
    }
    if (!selectedAmount) {
      toast.error('Пожалуйста, выберите сумму сертификата');
      return;
    }
    if (!recipientName || !recipientEmail) {
      toast.error('Пожалуйста, заполните данные получателя');
      return;
    }
    setIsLoading(true);
    try {
      const giftCard = purchaseGiftCard(selectedAmount, user.id);
      toast.success('Сертификат успешно приобретен!');
      // Здесь можно добавить логику отправки email получателю
    } catch (error) {
      toast.error('Произошла ошибка при покупке сертификата');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-0 px-0">
      {/* Заголовок под шапкой */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full flex flex-col items-center pt-32 pb-6"
      >
        <div className="flex items-center gap-4 mb-2">
          <Gift size={40} className="text-pink-500 drop-shadow-lg animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg">
            Подарочные сертификаты
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mt-2">
          Подарите незабываемый отдых своим близким — выберите сертификат и отправьте его в пару кликов!
        </p>
      </motion.div>

      {/* Карточки сертификатов */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-6xl mx-auto px-4"
      >
        {giftCardAmounts.map((card, idx) => (
          <motion.div
            key={card.amount}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
            }}
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(80, 0, 200, 0.15)' }}
            className={`relative rounded-2xl p-8 cursor-pointer transition-all border-2 ${
              selectedAmount === card.amount
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white border-blue-600 shadow-2xl scale-105'
                : 'bg-white border-gray-200 shadow-lg hover:shadow-2xl'
            }`}
            onClick={() => setSelectedAmount(card.amount)}
          >
            <div className="flex flex-col items-center">
              <Gift size={32} className={selectedAmount === card.amount ? 'text-white mb-2' : 'text-pink-400 mb-2'} />
              <h3 className="text-2xl font-bold mb-2 tracking-wide">{card.title}</h3>
              <p className="text-3xl font-extrabold mb-4 tracking-wider">
                {card.amount.toLocaleString()} ₸
              </p>
              <p className={`text-sm ${selectedAmount === card.amount ? 'text-white/80' : 'text-gray-500'}`}>Действует 1 год с момента покупки</p>
            </div>
            {selectedAmount === card.amount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow"
              >
                Выбрано
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Форма получателя */}
      <AnimatePresence>
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-10 mb-16 border border-blue-100 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Gift size={24} className="text-pink-400" /> Данные получателя
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя получателя
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-lg"
                placeholder="Введите имя получателя"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email получателя
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-lg"
                placeholder="Введите email получателя"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Поздравительное сообщение (необязательно)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-lg"
                rows={4}
                placeholder="Введите ваше сообщение"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePurchase}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-60"
            >
              {isLoading ? 'Обработка...' : 'Приобрести сертификат'}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 