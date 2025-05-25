'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Rate relative to base currency (KZT)
}

export const currencies: Currency[] = [
  { code: 'KZT', name: 'Казахстанский тенге', symbol: '₸', rate: 1 },
  { code: 'RUB', name: 'Российский рубль', symbol: '₽', rate: 0.22 },
  { code: 'USD', name: 'Доллар США', symbol: '$', rate: 0.0022 },
  { code: 'EUR', name: 'Евро', symbol: '€', rate: 0.0020 }
];

interface CurrencyContextType {
  currency: string;
  currencies: Currency[];
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number, fromCurrency?: string) => number;
  setCurrency: (code: string) => void;
  getCurrencyInfo: (code?: string) => Currency;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>('KZT'); // По умолчанию тенге

  useEffect(() => {
    // Загружаем сохраненную валюту из localStorage
    const savedCurrency = localStorage.getItem('selected_currency');
    if (savedCurrency && currencies.find(c => c.code === savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (code: string) => {
    setCurrencyState(code);
    localStorage.setItem('selected_currency', code);
  };

  const getCurrencyInfo = (code?: string): Currency => {
    const currencyCode = code || currency;
    return currencies.find(c => c.code === currencyCode) || currencies[0]; // KZT as fallback
  };

  const convertPrice = (amount: number, fromCurrency: string = 'KZT'): number => {
    const fromCurr = currencies.find(c => c.code === fromCurrency);
    const toCurr = getCurrencyInfo();
    
    if (!fromCurr || !toCurr) return amount;
    
    // Convert to base currency (KZT) first, then to target currency
    const amountInKZT = amount / fromCurr.rate;
    return amountInKZT * toCurr.rate;
  };

  const formatPrice = (amount: number, fromCurrency: string = 'KZT'): string => {
    const convertedAmount = convertPrice(amount, fromCurrency);
    const currencyInfo = getCurrencyInfo();
    
    return `${convertedAmount.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })} ${currencyInfo.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      currencies,
      formatPrice,
      convertPrice,
      setCurrency,
      getCurrencyInfo
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

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
  getAllCurrencies: (): Currency[] => {
    return currencies;
  },

  // Конвертировать цену без контекста
  convertPrice: (price: number, from: string, to: string): number => {
    if (from === to) return price;
    
    // Конвертируем в тенге
    const priceInKzt = price / currencies.find(c => c.code === from)?.rate || 1;
    
    // Конвертируем в целевую валюту
    const toCurr = currencies.find(c => c.code === to);
    if (!toCurr) return price;
    
    return Math.round(priceInKzt * toCurr.rate);
  },

  // Форматировать цену без контекста
  formatPrice: (price: number, currency: string, fromCurrency: string = 'KZT'): string => {
    const convertedPrice = CurrencyUtils.convertPrice(price, fromCurrency, currency);
    const currencyInfo = currencies.find(c => c.code === currency) || currencies[0]; // KZT as fallback
    
    return `${convertedPrice.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })} ${currencyInfo.symbol}`;
  }
}; 