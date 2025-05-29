export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  type: 'gift-card' | 'promo-code';
  title: string;
  description: string;
  validUntil: string;
  isUsed: boolean;
  usedAt?: string;
  purchasedAt: string;
  purchasedBy: string;
  usedBy?: string;
  minOrderAmount?: number;
  maxDiscount?: number;
  discountPercent?: number;
}

export interface UserGiftCard {
  id: string;
  userId: string;
  giftCardId: string;
  giftCard: GiftCard;
  addedAt: string;
}

// Предустановленные промокоды
const PROMO_CODES: GiftCard[] = [
  {
    id: 'early-booking-25',
    code: 'EARLY25',
    amount: 0,
    type: 'promo-code',
    title: 'Раннее бронирование',
    description: 'Скидка 25% при бронировании за 30 дней',
    validUntil: '2024-12-31',
    isUsed: false,
    purchasedAt: '2024-01-01',
    purchasedBy: 'system',
    discountPercent: 25,
    minOrderAmount: 5000
  },
  {
    id: 'weekend-almaty-15',
    code: 'WEEKEND15',
    amount: 0,
    type: 'promo-code',
    title: 'Выходные в Алматы',
    description: 'Специальные цены на уикенд',
    validUntil: '2024-11-30',
    isUsed: false,
    purchasedAt: '2024-01-01',
    purchasedBy: 'system',
    discountPercent: 15,
    minOrderAmount: 3000
  },
  {
    id: 'long-stay-30',
    code: 'LONGSTAY30',
    amount: 0,
    type: 'promo-code',
    title: 'Длительное пребывание',
    description: 'При бронировании от 7 ночей',
    validUntil: '2024-12-15',
    isUsed: false,
    purchasedAt: '2024-01-01',
    purchasedBy: 'system',
    discountPercent: 30,
    minOrderAmount: 10000
  }
];

// Генерация уникального кода
export const generateGiftCardCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Создание подарочного сертификата
export const createGiftCard = (amount: number, purchasedBy: string): GiftCard => {
  const code = generateGiftCardCode();
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1); // Действует год

  return {
    id: `gift-${Date.now()}`,
    code,
    amount,
    type: 'gift-card',
    title: `Подарочный сертификат ${amount.toLocaleString()} ₸`,
    description: `Подарочный сертификат на сумму ${amount.toLocaleString()} тенге`,
    validUntil: validUntil.toISOString().split('T')[0],
    isUsed: false,
    purchasedAt: new Date().toISOString(),
    purchasedBy
  };
};

// Получение всех подарочных карт пользователя
export const getUserGiftCards = (userId: string): UserGiftCard[] => {
  const stored = localStorage.getItem(`user_gift_cards_${userId}`);
  return stored ? JSON.parse(stored) : [];
};

// Добавление подарочной карты пользователю
export const addGiftCardToUser = (userId: string, giftCard: GiftCard): void => {
  const userGiftCards = getUserGiftCards(userId);
  const userGiftCard: UserGiftCard = {
    id: `user_gift_${Date.now()}`,
    userId,
    giftCardId: giftCard.id,
    giftCard,
    addedAt: new Date().toISOString()
  };
  
  userGiftCards.push(userGiftCard);
  localStorage.setItem(`user_gift_cards_${userId}`, JSON.stringify(userGiftCards));
};

// Покупка подарочного сертификата
export const purchaseGiftCard = (amount: number, userId: string): GiftCard => {
  const giftCard = createGiftCard(amount, userId);
  addGiftCardToUser(userId, giftCard);
  return giftCard;
};

// Активация промокода/подарочного сертификата по коду
export const activateGiftCardByCode = (code: string, userId: string): GiftCard | null => {
  // Проверяем среди предустановленных промокодов
  const promoCode = PROMO_CODES.find(promo => promo.code === code.toUpperCase());
  if (promoCode) {
    // Проверяем, не использовал ли уже пользователь этот промокод
    const userGiftCards = getUserGiftCards(userId);
    const alreadyUsed = userGiftCards.some(ugc => ugc.giftCard.code === code.toUpperCase());
    
    if (!alreadyUsed) {
      const userPromoCode = { ...promoCode };
      addGiftCardToUser(userId, userPromoCode);
      return userPromoCode;
    }
    return null; // Уже использован
  }

  // Проверяем среди всех подарочных карт в системе
  const allUsers = Object.keys(localStorage).filter(key => key.startsWith('user_gift_cards_'));
  for (const userKey of allUsers) {
    const userGiftCards: UserGiftCard[] = JSON.parse(localStorage.getItem(userKey) || '[]');
    const giftCard = userGiftCards.find(ugc => ugc.giftCard.code === code.toUpperCase());
    
    if (giftCard && !giftCard.giftCard.isUsed) {
      // Если это не карта текущего пользователя, добавляем её ему
      if (!userKey.endsWith(userId)) {
        addGiftCardToUser(userId, giftCard.giftCard);
      }
      return giftCard.giftCard;
    }
  }

  return null;
};

// Применение скидки
export const applyGiftCard = (giftCardId: string, userId: string, orderAmount: number): { discount: number; newAmount: number } => {
  const userGiftCards = getUserGiftCards(userId);
  const userGiftCard = userGiftCards.find(ugc => ugc.giftCard.id === giftCardId);
  
  if (!userGiftCard || userGiftCard.giftCard.isUsed) {
    return { discount: 0, newAmount: orderAmount };
  }

  const giftCard = userGiftCard.giftCard;
  
  // Проверяем минимальную сумму заказа
  if (giftCard.minOrderAmount && orderAmount < giftCard.minOrderAmount) {
    return { discount: 0, newAmount: orderAmount };
  }

  let discount = 0;

  if (giftCard.type === 'gift-card') {
    // Подарочный сертификат - вычитаем сумму
    discount = Math.min(giftCard.amount, orderAmount);
  } else if (giftCard.type === 'promo-code' && giftCard.discountPercent) {
    // Промокод - применяем процентную скидку
    discount = (orderAmount * giftCard.discountPercent) / 100;
    if (giftCard.maxDiscount) {
      discount = Math.min(discount, giftCard.maxDiscount);
    }
  }

  const newAmount = Math.max(0, orderAmount - discount);

  // Отмечаем как использованный
  giftCard.isUsed = true;
  giftCard.usedAt = new Date().toISOString();
  giftCard.usedBy = userId;

  // Сохраняем изменения
  localStorage.setItem(`user_gift_cards_${userId}`, JSON.stringify(userGiftCards));

  return { discount, newAmount };
};

// Проверка валидности подарочной карты
export const isGiftCardValid = (giftCard: GiftCard): boolean => {
  if (giftCard.isUsed) return false;
  
  const validUntil = new Date(giftCard.validUntil);
  const now = new Date();
  
  return validUntil > now;
};

// Получение доступных промокодов
export const getAvailablePromoCodes = (): GiftCard[] => {
  return PROMO_CODES.filter(promo => isGiftCardValid(promo));
}; 