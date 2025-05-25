# 🚀 Деплой на Vercel.app - Подробная инструкция

## 📋 Содержание
1. [Подготовка проекта](#подготовка-проекта)
2. [Регистрация на Vercel](#регистрация-на-vercel)
3. [Деплой через Git](#деплой-через-git)
4. [Деплой через CLI](#деплой-через-cli)
5. [Настройка переменных окружения](#настройка-переменных-окружения)
6. [Настройка домена](#настройка-домена)
7. [Мониторинг и логи](#мониторинг-и-логи)
8. [Обновления проекта](#обновления-проекта)
9. [Решение проблем](#решение-проблем)

---

## 🛠️ Подготовка проекта

### ✅ Проверка готовности
Убедитесь, что проект готов к деплою:

```bash
# 1. Проверьте что проект собирается без ошибок
npm run build

# 2. Проверьте что проект запускается локально
npm run start
```

### 📦 Необходимые файлы
Ваш проект должен содержать:
- ✅ `package.json` с скриптами build/start
- ✅ `next.config.ts` с правильной конфигурацией
- ✅ `vercel.json` (опционально, но рекомендуется)
- ✅ `.gitignore` с исключениями для .env и node_modules

---

## 🔐 Регистрация на Vercel

### 1. Создание аккаунта
1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите **"Start Deploying"** или **"Sign Up"**
3. Выберите регистрацию через:
   - **GitHub** (рекомендуется)
   - **GitLab**
   - **Bitbucket**
   - **Email**

### 2. Привязка Git-репозитория
После регистрации подключите ваш Git-провайдер для автоматического деплоя.

---

## 🔄 Деплой через Git (Рекомендуется)

### Шаг 1: Загрузка в Git
```bash
# Инициализируйте git (если еще не сделали)
git init

# Добавьте удаленный репозиторий
git remote add origin https://github.com/ваш-username/ваш-репозиторий.git

# Добавьте все файлы
git add .

# Сделайте коммит
git commit -m "Initial commit: Hotel Booking System"

# Загрузите на GitHub
git push -u origin main
```

### Шаг 2: Импорт в Vercel
1. Войдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Нажмите **"New Project"**
3. Найдите ваш репозиторий и нажмите **"Import"**
4. Настройте параметры проекта:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
5. Нажмите **"Deploy"**

### Шаг 3: Ожидание деплоя
- Процесс займет 2-5 минут
- Вы увидите логи сборки в реальном времени
- После завершения получите URL вашего сайта

---

## 💻 Деплой через CLI

### Установка Vercel CLI
```bash
npm i -g vercel
```

### Авторизация
```bash
vercel login
```

### Деплой проекта
```bash
# В папке проекта выполните:
vercel

# Следуйте инструкциям:
# ? Set up and deploy "hotel-booking"? [Y/n] y
# ? Which scope do you want to deploy to? (ваш аккаунт)
# ? Link to existing project? [y/N] n
# ? What's your project's name? hotel-booking
# ? In which directory is your code located? ./
```

### Продакшен деплой
```bash
vercel --prod
```

---

## ⚙️ Настройка переменных окружения

### В Vercel Dashboard
1. Откройте ваш проект в Vercel
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте переменные:

```env
# Обязательные переменные
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Опциональные (для расширенной функциональности)
DATABASE_URL=your_database_url
JWT_SECRET=your-super-secret-key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### Через CLI
```bash
# Добавление переменной
vercel env add NODE_ENV production

# Просмотр переменных
vercel env ls

# Удаление переменной
vercel env rm NODE_ENV
```

---

## 🌐 Настройка домена

### Добавление собственного домена
1. В проекте перейдите в **Settings** → **Domains**
2. Нажмите **"Add Domain"**
3. Введите ваш домен: `example.com`
4. Настройте DNS записи у регистратора домена:

```dns
Type: CNAME
Name: www (или @)
Value: cname.vercel-dns.com
```

### SSL сертификат
- Vercel автоматически выдает SSL сертификаты
- Поддерживается автоматическое обновление
- HTTPS включается по умолчанию

---

## 📊 Мониторинг и логи

### Просмотр метрик
1. **Functions** - статистика серверных функций
2. **Analytics** - данные о посещаемости
3. **Speed Insights** - производительность

### Логи деплоя
```bash
# Просмотр логов через CLI
vercel logs

# Просмотр конкретного деплоя
vercel logs https://your-deployment-url.vercel.app
```

### Мониторинг в реальном времени
- В Dashboard → **Functions** → **View Function Logs**
- Интеграция с внешними сервисами мониторинга

---

## 🔄 Обновления проекта

### Автоматические обновления
При пуше в main ветку происходит автоматический деплой:

```bash
git add .
git commit -m "Update: новая функциональность"
git push origin main
```

### Preview деплои
Для других веток создаются preview URL:
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```

### Откат к предыдущей версии
1. В Dashboard → **Deployments**
2. Найдите нужный деплой
3. Нажмите **"Promote to Production"**

---

## 🛠️ Решение проблем

### Частые ошибки и решения

#### 1. "Build failed" - ошибки сборки
```bash
# Локально проверьте сборку
npm run build

# Исправьте ошибки TypeScript/ESLint
npm run lint:fix
```

#### 2. "Function timeout" - таймаут функций
Добавьте в `vercel.json`:
```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### 3. "Environment variables not found"
Убедитесь что переменные добавлены в Settings → Environment Variables

#### 4. "Module not found" ошибки
```bash
# Очистите кеш
npm cache clean --force

# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
```

#### 5. Проблемы с изображениями
Обновите `next.config.ts`:
```typescript
{
  images: {
    domains: ['your-domain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  }
}
```

---

## 🚀 Оптимизация для продакшена

### Настройки производительности

#### 1. Обновите `vercel.json`:
```json
{
  "framework": "nextjs",
  "regions": ["cdg1"],
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

#### 2. Настройте кеширование:
```typescript
// next.config.ts
{
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

#### 3. Оптимизируйте изображения:
```typescript
import Image from 'next/image'

<Image
  src="/hotel-image.jpg"
  alt="Hotel"
  width={300}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

## 📈 Масштабирование

### Pro план функции
- **Больше функций**: увеличенные лимиты
- **Analytics**: детальная аналитика
- **Team collaboration**: командная работа
- **Priority support**: приоритетная поддержка

### Enterprise возможности
- **Custom domains**: неограниченные домены
- **Advanced security**: расширенная безопасность
- **SLA**: гарантии доступности
- **Dedicated support**: выделенная поддержка

---

## 🔗 Полезные ссылки

- 📚 [Документация Vercel](https://vercel.com/docs)
- 🎯 [Next.js на Vercel](https://vercel.com/docs/frameworks/nextjs)
- 🔧 [Vercel CLI](https://vercel.com/docs/cli)
- 💡 [Best Practices](https://vercel.com/docs/concepts/best-practices)
- 🛠️ [Troubleshooting](https://vercel.com/docs/platform/troubleshooting)

---

## 📞 Поддержка

### Если возникли проблемы:
1. **Проверьте логи** в Vercel Dashboard
2. **Изучите документацию** Vercel
3. **Обратитесь в поддержку** через Dashboard
4. **Сообщество**: [GitHub Discussions](https://github.com/vercel/vercel/discussions)

---

**✅ Готово! Ваш Hotel Booking System теперь доступен онлайн!**

🎉 **Поздравляем с успешным деплоем!** Ваша система бронирования отелей теперь работает в продакшене и доступна пользователям по всему миру. 