'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Типы валют
export type Currency = 'rub' | 'kzt' | 'usd' | 'eur';

// Информация о валютах
export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  rate: number; // Курс к базовой валюте (KZT)
}

// Конфигурация валют (курсы относительно тенге)
export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  kzt: {
    code: 'kzt',
    symbol: '₸',
    name: 'Казахстанский тенге',
    rate: 1 // Базовая валюта
  },
  rub: {
    code: 'rub',
    symbol: '₽',
    name: 'Российский рубль',
    rate: 0.22 // 1 рубль = 0.22 тенге (примерный курс)
  },
  usd: {
    code: 'usd',
    symbol: '$',
    name: 'Доллар США',
    rate: 450 // 1 доллар = 450 тенге (примерный курс)
  },
  eur: {
    code: 'eur',
    symbol: '€',
    name: 'Евро',
    rate: 485 // 1 евро = 485 тенге (примерный курс)
  }
};

// Интерфейс контекста валют
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency?: Currency) => number;
  formatPrice: (price: number, fromCurrency?: Currency) => string;
  getCurrencyInfo: (currency?: Currency) => CurrencyInfo;
}

// Создаем контекст
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Провайдер контекста валют
interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>('kzt'); // По умолчанию тенге

  // Загружаем валюту из localStorage при инициализации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('userPreferences');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed.preferences?.currency) {
            setCurrency(parsed.preferences.currency);
          }
        } catch (error) {
          console.log('Ошибка при загрузке валюты:', error);
        }
      }
    }
  }, []);

  // Сохраняем валюту в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('userPreferences');
      let settings = {};
      
      if (savedSettings) {
        try {
          settings = JSON.parse(savedSettings);
        } catch (error) {
          console.log('Ошибка при парсинге настроек:', error);
        }
      }

      const updatedSettings = {
        ...settings,
        preferences: {
          ...((settings as any).preferences || {}),
          currency
        }
      };

      localStorage.setItem('userPreferences', JSON.stringify(updatedSettings));
    }
  }, [currency]);

  // Конвертирует цену из одной валюты в текущую
  const convertPrice = (price: number, fromCurrency: Currency = 'rub'): number => {
    if (fromCurrency === currency) return price;

    // Конвертируем в тенге (базовая валюта)
    const priceInKzt = price / CURRENCIES[fromCurrency].rate;
    
    // Конвертируем из тенге в целевую валюту
    return Math.round(priceInKzt * CURRENCIES[currency].rate);
  };

  // Форматирует цену с символом валюты
  const formatPrice = (price: number, fromCurrency: Currency = 'rub'): string => {
    const convertedPrice = convertPrice(price, fromCurrency);
    const currencyInfo = CURRENCIES[currency];
    
    return `${convertedPrice.toLocaleString('ru-RU')}${currencyInfo.symbol}`;
  };

  // Получает информацию о валюте
  const getCurrencyInfo = (targetCurrency?: Currency): CurrencyInfo => {
    return CURRENCIES[targetCurrency || currency];
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    getCurrencyInfo
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Хук для использования контекста валют
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Утилитарные функции для работы с валютами
export const CurrencyUtils = {
  // Получить все доступные валюты
  getAllCurrencies: (): CurrencyInfo[] => {
    return Object.values(CURRENCIES);
  },

  // Конвертировать цену без контекста
  convertPrice: (price: number, from: Currency, to: Currency): number => {
    if (from === to) return price;
    
    // Конвертируем в тенге
    const priceInKzt = price / CURRENCIES[from].rate;
    
    // Конвертируем в целевую валюту
    return Math.round(priceInKzt * CURRENCIES[to].rate);
  },

  // Форматировать цену без контекста
  formatPrice: (price: number, currency: Currency, fromCurrency: Currency = 'rub'): string => {
    const convertedPrice = CurrencyUtils.convertPrice(price, fromCurrency, currency);
    const currencyInfo = CURRENCIES[currency];
    
    return `${convertedPrice.toLocaleString('ru-RU')}${currencyInfo.symbol}`;
  }
}; 