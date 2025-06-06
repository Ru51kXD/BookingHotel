# Система анимаций и админ-панель

## Обзор новых функций

Добавлена красивая система анимаций для:
- 🎁 Покупки подарочных сертификатов
- 📝 Подачи заявок на партнерство
- 🏷️ Использования специальных предложений
- 👨‍💼 Админ-панель для управления всеми операциями

## Компоненты

### 1. SuccessAnimation (`/src/components/ui/SuccessAnimation.tsx`)
Универсальный компонент анимации успеха с:
- ✨ Конфетти эффектом
- 🌟 Блестящими звездами
- ⏱️ Автоматическим закрытием с прогресс-баром
- 🎨 Разными цветовыми схемами для разных типов действий

### 2. Админская система (`/src/lib/admin.ts`)
Управление данными:
- `PartnerApplication` - заявки партнеров
- `GiftCardPurchase` - покупки сертификатов
- `OfferUsage` - использования предложений

## Страницы с анимациями

### 🎁 Подарочные карты (`/gift-cards`)
**Анимация при покупке:**
1. Пользователь выбирает тип карты
2. Заполняет форму покупки
3. При успешной покупке показывается анимация с:
   - Конфетти
   - Кодом сертификата
   - Суммой покупки
   - Кнопкой перехода к "Мои сертификаты"

**Интеграция с админ-панелью:**
- Покупка сохраняется в `localStorage`
- Данные отображаются в админ-панели
- Админ видит: покупателя, тип карты, сумму, получателя, код

### 🤝 Партнеры (`/partners`)
**Анимация при подаче заявки:**
1. Пользователь заполняет форму заявки
2. При успешной отправке показывается анимация с:
   - Иконкой отправки
   - Сообщением об успехе
   - Информацией о сроках рассмотрения

**Интеграция с админ-панелью:**
- Заявка сохраняется со статусом "pending"
- Админ может одобрить/отклонить заявку
- Отображается вся информация о заявителе

### 🏷️ Специальные предложения (`/offers`)
**Анимация при использовании:**
1. Пользователь нажимает "Воспользоваться предложением"
2. Промокод автоматически активируется
3. Показывается анимация с:
   - Иконкой корзины
   - Кодом промокода
   - Размером скидки

**Интеграция с админ-панелью:**
- Использование сохраняется с данными пользователя
- Админ видит: кто, когда, какое предложение использовал

## Админ-панель (`/admin`)

### Доступ
- Только для `admin@rulit.com`
- Пароль: `chetam2025`

### Разделы

#### 📊 Обзор
- Общая статистика по всем операциям
- Последние заявки и покупки
- Быстрый доступ к основным метрикам

#### 👥 Заявки партнеров
- Таблица всех заявок с фильтрацией
- Возможность одобрить/отклонить заявки
- Поиск по имени, email, компании
- Фильтр по статусу (все/ожидают/одобрено/отклонено)

#### 🎁 Покупки сертификатов
- Список всех покупок
- Информация о покупателе и получателе
- Коды сертификатов
- Суммы и даты покупок

#### 🏷️ Использования предложений
- Кто и когда использовал промокоды
- Размеры скидок
- Коды предложений

## Технические детали

### Хранение данных
- Используется `localStorage` для демонстрации
- В продакшене можно легко заменить на API
- Все функции возвращают типизированные объекты

### Анимации
- Используется `framer-motion`
- Конфетти создается программно
- Автоматическое закрытие с таймером
- Адаптивный дизайн

### Интеграция
- Все страницы интегрированы с админской системой
- Данные сохраняются при каждом действии
- Админ видит актуальную информацию в реальном времени

## Использование

1. **Для покупки сертификата:**
   - Перейти на `/gift-cards`
   - Выбрать тип карты
   - Заполнить форму
   - Наслаждаться анимацией!

2. **Для подачи заявки:**
   - Перейти на `/partners`
   - Нажать "Подать заявку"
   - Заполнить форму
   - Получить красивое подтверждение

3. **Для использования предложения:**
   - Перейти на `/offers`
   - Нажать "Воспользоваться предложением"
   - Промокод автоматически добавится в профиль

4. **Для просмотра в админ-панели:**
   - Войти как `admin@rulit.com`
   - Перейти на `/admin`
   - Просмотреть все операции

## Мои сертификаты (`/my-cards`)

Новая страница для пользователей:
- Просмотр активных сертификатов
- История использованных промокодов
- Активация новых кодов
- Статистика по картам

Все данные синхронизируются с админ-панелью! 