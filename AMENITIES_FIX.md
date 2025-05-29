# Исправление ошибки парсинга amenities

## Проблема
```
SyntaxError: Unexpected token 'W', "Wi-Fi,SPA,"... is not valid JSON
```

**Причина**: В базе данных `amenities` хранятся в двух форматах:
- Старые записи: как строка с запятыми `"Wi-Fi,SPA,"`
- Новые записи: как JSON массив `["Wi-Fi","SPA"]`

## Решение
Создана универсальная функция `parseAmenities()` которая:
1. Сначала пытается распарсить как JSON
2. Если не получается, обрабатывает как строку с запятыми
3. Возвращает массив строк

## Код исправления
```typescript
const parseAmenities = (amenities: string | null | undefined): string[] => {
  if (!amenities) return [];
  
  // Пробуем распарсить как JSON
  try {
    const parsed = JSON.parse(amenities);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    // Если не JSON, то обрабатываем как строку с запятыми
  }
  
  // Обрабатываем как строку с запятыми
  return amenities.split(',').filter(a => a.trim()).map(a => a.trim());
};
```

## Проверка
1. Перейдите в админ панель (`/admin`)
2. Откройте вкладку "Отели"
3. Ошибка в консоли должна исчезнуть
4. Все отели должны загружаться корректно
5. Amenities должны отображаться правильно

## Статус: ✅ Исправлено 