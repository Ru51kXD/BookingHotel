// Популярные направления для автокомплита
export const popularDestinations = [
  // Казахстан - приоритетные направления
  { city: 'Астана', country: 'Казахстан', label: 'Астана, Казахстан' },
  { city: 'Алматы', country: 'Казахстан', label: 'Алматы, Казахстан' },
  { city: 'Шымкент', country: 'Казахстан', label: 'Шымкент, Казахстан' },
  { city: 'Актобе', country: 'Казахстан', label: 'Актобе, Казахстан' },
  { city: 'Караганда', country: 'Казахстан', label: 'Караганда, Казахстан' },
  { city: 'Тараз', country: 'Казахстан', label: 'Тараз, Казахстан' },
  { city: 'Павлодар', country: 'Казахстан', label: 'Павлодар, Казахстан' },
  { city: 'Усть-Каменогорск', country: 'Казахстан', label: 'Усть-Каменогорск, Казахстан' },
  
  // Страны (для поиска по странам)
  { city: 'Казахстан', country: 'Казахстан', label: 'Казахстан (все города)' },
  { city: 'Россия', country: 'Россия', label: 'Россия (все города)' },
  { city: 'Франция', country: 'Франция', label: 'Франция (все города)' },
  { city: 'Италия', country: 'Италия', label: 'Италия (все города)' },
  { city: 'Испания', country: 'Испания', label: 'Испания (все города)' },
  { city: 'Германия', country: 'Германия', label: 'Германия (все города)' },
  { city: 'Великобритания', country: 'Великобритания', label: 'Великобритания (все города)' },
  { city: 'США', country: 'США', label: 'США (все города)' },
  { city: 'Китай', country: 'Китай', label: 'Китай (все города)' },
  { city: 'Япония', country: 'Япония', label: 'Япония (все города)' },
  { city: 'Таиланд', country: 'Таиланд', label: 'Таиланд (все города)' },
  { city: 'ОАЭ', country: 'ОАЭ', label: 'ОАЭ (все города)' },
  { city: 'Турция', country: 'Турция', label: 'Турция (все города)' },
  
  // Россия
  { city: 'Москва', country: 'Россия', label: 'Москва, Россия' },
  { city: 'Санкт-Петербург', country: 'Россия', label: 'Санкт-Петербург, Россия' },
  { city: 'Сочи', country: 'Россия', label: 'Сочи, Россия' },
  
  // Европа
  { city: 'Париж', country: 'Франция', label: 'Париж, Франция' },
  { city: 'Лондон', country: 'Великобритания', label: 'Лондон, Великобритания' },
  { city: 'Рим', country: 'Италия', label: 'Рим, Италия' },
  { city: 'Барселона', country: 'Испания', label: 'Барселона, Испания' },
  { city: 'Мадрид', country: 'Испания', label: 'Мадрид, Испания' },
  { city: 'Берлин', country: 'Германия', label: 'Берлин, Германия' },
  { city: 'Амстердам', country: 'Нидерланды', label: 'Амстердам, Нидерланды' },
  { city: 'Прага', country: 'Чехия', label: 'Прага, Чехия' },
  { city: 'Вена', country: 'Австрия', label: 'Вена, Австрия' },
  { city: 'Стокгольм', country: 'Швеция', label: 'Стокгольм, Швеция' },
  
  // Азия
  { city: 'Токио', country: 'Япония', label: 'Токио, Япония' },
  { city: 'Сеул', country: 'Южная Корея', label: 'Сеул, Южная Корея' },
  { city: 'Пекин', country: 'Китай', label: 'Пекин, Китай' },
  { city: 'Шанхай', country: 'Китай', label: 'Шанхай, Китай' },
  { city: 'Бангкок', country: 'Таиланд', label: 'Бангкок, Таиланд' },
  { city: 'Сингапур', country: 'Сингапур', label: 'Сингапур' },
  { city: 'Дубай', country: 'ОАЭ', label: 'Дубай, ОАЭ' },
  { city: 'Стамбул', country: 'Турция', label: 'Стамбул, Турция' },
  
  // Америка
  { city: 'Нью-Йорк', country: 'США', label: 'Нью-Йорк, США' },
  { city: 'Лос-Анджелес', country: 'США', label: 'Лос-Анджелес, США' },
  { city: 'Чикаго', country: 'США', label: 'Чикаго, США' },
  { city: 'Майами', country: 'США', label: 'Майами, США' },
  { city: 'Торонто', country: 'Канада', label: 'Торонто, Канада' },
  { city: 'Ванкувер', country: 'Канада', label: 'Ванкувер, Канада' },
];

// Функция для поиска совпадений
export const searchDestinations = (query: string, limit: number = 8): typeof popularDestinations => {
  if (!query || query.length < 2) {
    return popularDestinations.slice(0, limit);
  }
  
  const searchQuery = query.toLowerCase().trim();
  
  return popularDestinations
    .filter(destination => 
      destination.city.toLowerCase().includes(searchQuery) ||
      destination.country.toLowerCase().includes(searchQuery) ||
      destination.label.toLowerCase().includes(searchQuery)
    )
    .slice(0, limit);
};

// Эмодзи флагов для стран
export const countryFlags: { [key: string]: string } = {
  'Россия': '🇷🇺',
  'Казахстан': '🇰🇿',
  'Франция': '🇫🇷',
  'Великобритания': '🇬🇧',
  'Италия': '🇮🇹',
  'Испания': '🇪🇸',
  'Германия': '🇩🇪',
  'Нидерланды': '🇳🇱',
  'Чехия': '🇨🇿',
  'Австрия': '🇦🇹',
  'Швеция': '🇸🇪',
  'Япония': '🇯🇵',
  'Южная Корея': '🇰🇷',
  'Китай': '🇨🇳',
  'Таиланд': '🇹🇭',
  'Сингапур': '🇸🇬',
  'ОАЭ': '🇦🇪',
  'Турция': '🇹🇷',
  'США': '🇺🇸',
  'Канада': '🇨🇦',
}; 