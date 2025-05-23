import { useState, useCallback } from 'react';

export interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'mir' | 'amex';
  cardNumber: string; // Замаскированный номер карты
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddCardData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isDefault?: boolean;
}

// Временное хранилище карт пользователей
const userCards: Map<string, PaymentCard[]> = new Map();

// Демо-карты для демо-пользователя
const demoCards: PaymentCard[] = [
  {
    id: 'card_demo1',
    type: 'visa',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'DEMO USER',
    expiryDate: '12/25',
    isDefault: true,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: new Date().toISOString()
  },
  {
    id: 'card_demo2',
    type: 'mastercard',
    cardNumber: '**** **** **** 5678',
    cardHolder: 'DEMO USER',
    expiryDate: '06/26',
    isDefault: false,
    created_at: '2024-01-15T00:00:00.000Z',
    updated_at: new Date().toISOString()
  }
];
userCards.set('demo123', demoCards);

export class PaymentService {
  // Получить карты пользователя
  static getUserCards(userId: string): PaymentCard[] {
    // Проверяем localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`cards_${userId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          localStorage.removeItem(`cards_${userId}`);
        }
      }
    }

    // Возвращаем из памяти
    return userCards.get(userId) || [];
  }

  // Добавить новую карту
  static async addCard(
    userId: string, 
    cardData: AddCardData
  ): Promise<{ success: boolean; card?: PaymentCard; error?: string }> {
    try {
      // Валидация данных карты
      const validation = this.validateCardData(cardData);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const cardId = `card_${Math.random().toString(36).substr(2, 9)}`;
      
      // Определяем тип карты по номеру
      const cardType = this.detectCardType(cardData.cardNumber);
      
      // Маскируем номер карты
      const maskedNumber = this.maskCardNumber(cardData.cardNumber);

      const card: PaymentCard = {
        id: cardId,
        type: cardType,
        cardNumber: maskedNumber,
        cardHolder: cardData.cardHolder.toUpperCase(),
        expiryDate: cardData.expiryDate,
        isDefault: cardData.isDefault || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const existingCards = this.getUserCards(userId);
      
      // Если это первая карта или пользователь хочет сделать её основной
      if (existingCards.length === 0 || card.isDefault) {
        // Убираем флаг default с других карт
        existingCards.forEach(c => c.isDefault = false);
        card.isDefault = true;
      }

      const updatedCards = [...existingCards, card];
      userCards.set(userId, updatedCards);

      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`cards_${userId}`, JSON.stringify(updatedCards));
      }

      return { success: true, card };
    } catch (error) {
      return { success: false, error: 'Ошибка при добавлении карты' };
    }
  }

  // Удалить карту
  static async removeCard(
    userId: string, 
    cardId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const existingCards = this.getUserCards(userId);
      const cardIndex = existingCards.findIndex(c => c.id === cardId);
      
      if (cardIndex === -1) {
        return { success: false, error: 'Карта не найдена' };
      }

      const cardToRemove = existingCards[cardIndex];
      const updatedCards = existingCards.filter(c => c.id !== cardId);

      // Если удаляем основную карту и есть другие карты, делаем первую основной
      if (cardToRemove.isDefault && updatedCards.length > 0) {
        updatedCards[0].isDefault = true;
      }

      userCards.set(userId, updatedCards);

      // Обновляем localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`cards_${userId}`, JSON.stringify(updatedCards));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ошибка при удалении карты' };
    }
  }

  // Установить карту как основную
  static async setDefaultCard(
    userId: string, 
    cardId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const existingCards = this.getUserCards(userId);
      const updatedCards = existingCards.map(card => ({
        ...card,
        isDefault: card.id === cardId,
        updated_at: card.id === cardId ? new Date().toISOString() : card.updated_at
      }));

      userCards.set(userId, updatedCards);

      // Обновляем localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(`cards_${userId}`, JSON.stringify(updatedCards));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Ошибка при обновлении карты' };
    }
  }

  // Валидация данных карты
  static validateCardData(cardData: AddCardData): { valid: boolean; error?: string } {
    // Проверка номера карты
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
      return { valid: false, error: 'Номер карты должен содержать 16 цифр' };
    }

    // Проверка имени держателя
    if (!cardData.cardHolder.trim()) {
      return { valid: false, error: 'Укажите имя держателя карты' };
    }

    // Проверка срока действия
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(cardData.expiryDate)) {
      return { valid: false, error: 'Неверный формат срока действия (MM/YY)' };
    }

    // Проверка CVV
    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      return { valid: false, error: 'CVV должен содержать 3-4 цифры' };
    }

    // Проверка срока действия на актуальность
    const [month, year] = cardData.expiryDate.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();
    
    if (expiryDate < now) {
      return { valid: false, error: 'Срок действия карты истек' };
    }

    return { valid: true };
  }

  // Определение типа карты по номеру
  static detectCardType(cardNumber: string): PaymentCard['type'] {
    const number = cardNumber.replace(/\s/g, '');
    
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    if (number.startsWith('2200') || number.startsWith('2204')) return 'mir';
    
    return 'visa'; // По умолчанию
  }

  // Маскирование номера карты
  static maskCardNumber(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${number.slice(-4)}`;
  }

  // Получить иконку карты
  static getCardIcon(type: PaymentCard['type']): string {
    const icons = {
      visa: '💳',
      mastercard: '💳', 
      mir: '💳',
      amex: '💳'
    };
    return icons[type] || '💳';
  }
}

// Хук для управления картами
export function usePayments() {
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserCards = useCallback((userId: string) => {
    setIsLoading(true);
    try {
      const userCards = PaymentService.getUserCards(userId);
      setCards(userCards);
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCard = useCallback(async (userId: string, cardData: AddCardData) => {
    setIsLoading(true);
    try {
      const result = await PaymentService.addCard(userId, cardData);
      if (result.success) {
        loadUserCards(userId);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadUserCards]);

  const removeCard = useCallback(async (userId: string, cardId: string) => {
    setIsLoading(true);
    try {
      const result = await PaymentService.removeCard(userId, cardId);
      if (result.success) {
        loadUserCards(userId);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadUserCards]);

  const setDefaultCard = useCallback(async (userId: string, cardId: string) => {
    setIsLoading(true);
    try {
      const result = await PaymentService.setDefaultCard(userId, cardId);
      if (result.success) {
        loadUserCards(userId);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [loadUserCards]);

  return {
    cards,
    isLoading,
    loadUserCards,
    addCard,
    removeCard,
    setDefaultCard
  };
} 