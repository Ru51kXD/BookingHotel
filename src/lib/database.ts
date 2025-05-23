import sqlite3 from 'sqlite3';
import path from 'path';

// Тип данных для отеля
export interface Hotel {
  id: number;
  name: string;
  category: string;
  city: string;
  address: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  description: string;
  amenities: string;
  created_at: string;
}

// Категории отелей
export const HOTEL_CATEGORIES = {
  LUXURY: 'luxury',
  BUSINESS: 'business',
  BUDGET: 'budget',
  RESORT: 'resort',
  BOUTIQUE: 'boutique'
} as const;

class DatabaseManager {
  private db: sqlite3.Database | null = null;
  private dbPath = path.join(process.cwd(), 'hotels.db');

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('Ошибка открытия базы данных:', err.message);
      } else {
        console.log('Подключение к SQLite базе данных установлено.');
        this.createTables();
        this.seedData();
      }
    });
  }

  private createTables() {
    if (!this.db) return;

    const createHotelsTable = `
      CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        price_per_night REAL NOT NULL,
        rating REAL NOT NULL,
        image_url TEXT,
        description TEXT,
        amenities TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.exec(createHotelsTable, (err) => {
      if (err) {
        console.error('Ошибка создания таблицы отелей:', err.message);
      } else {
        console.log('Таблица отелей создана успешно.');
      }
    });
  }

  private seedData() {
    if (!this.db) return;

    // Проверяем есть ли уже данные
    this.db.get("SELECT COUNT(*) as count FROM hotels", (err, row: any) => {
      if (err) {
        console.error('Ошибка проверки данных:', err.message);
        return;
      }

      if (row.count === 0) {
        this.insertSampleData();
      } else {
        // Проверяем есть ли старые локальные URL изображений
        this.db.get("SELECT COUNT(*) as count FROM hotels WHERE image_url LIKE '/images/%'", (err, row: any) => {
          if (!err && row && row.count > 0) {
            console.log('Найдены устаревшие URL изображений, обновляем базу данных...');
            // Удаляем все данные и создаем заново
            this.db!.run("DELETE FROM hotels", (err) => {
              if (!err) {
                this.insertSampleData();
              }
            });
          }
        });
      }
    });
  }

  private insertSampleData() {
    if (!this.db) return;

    const sampleHotels = [
      // ЛЮКС ОТЕЛИ (16 отелей)
      {
        name: 'Four Seasons Moscow',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Москва',
        address: 'ул. Охотный Ряд, 2',
        price_per_night: 25000,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop&auto=format',
        description: 'Роскошный отель в центре Москвы с потрясающим видом на Красную площадь.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Парковка,Консьерж'
      },
      {
        name: 'Belmond Grand Hotel Europe',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Санкт-Петербург',
        address: 'ул. Михайловская, 1/7',
        price_per_night: 22000,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=400&fit=crop&auto=format',
        description: 'Исторический отель класса люкс в самом сердце Санкт-Петербурга.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Экскурсии'
      },
      {
        name: 'Swissôtel Krasnye Holmy',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Москва',
        address: 'Космодамианская наб., 52/6',
        price_per_night: 18000,
        rating: 4.7,
        image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=400&fit=crop&auto=format',
        description: 'Современный отель с панорамным видом на Москву-реку.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Парковка'
      },
      {
        name: 'Ararat Park Hyatt Moscow',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Москва',
        address: 'Неглинная ул., 4',
        price_per_night: 28000,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=400&fit=crop&auto=format',
        description: 'Эксклюзивный отель рядом с Большим театром и Кремлем.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Камердинер'
      },
      {
        name: 'Lotte Hotel St. Petersburg',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Санкт-Петербург',
        address: 'Антонина Нежданова ул., 2',
        price_per_night: 24000,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
        description: 'Роскошный отель с видом на Исаакиевский собор.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Консьерж'
      },
      {
        name: 'The St. Regis Moscow Nikolskaya',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Москва',
        address: 'Никольская ул., 12',
        price_per_night: 32000,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
        description: 'Элитный отель в самом сердце исторического центра Москвы.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий'
      },
      {
        name: 'Kempinski Hotel Moika 22',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Санкт-Петербург',
        address: 'наб. реки Мойки, 22',
        price_per_night: 26000,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
        description: 'Отель в историческом дворце XVIII века на берегу Мойки.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Библиотека'
      },
      {
        name: 'Rosa Ski Inn Luxury',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Сочи',
        address: 'Красная Поляна, ул. Горная Карусель, 5',
        price_per_night: 20000,
        rating: 4.7,
        image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=400&fit=crop&auto=format',
        description: 'Эксклюзивный горнолыжный отель в Красной Поляне.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Лыжная школа,Подъемники,Консьерж'
      },
      {
        name: 'Mandarin Oriental Moscow',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Москва',
        address: 'ул. Тверская, 3',
        price_per_night: 30000,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
        description: 'Роскошный отель в самом центре столицы.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дворецкий'
      },
      {
        name: 'W St. Petersburg',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Санкт-Петербург',
        address: 'Вознесенский пр., 6',
        price_per_night: 27000,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
        description: 'Стильный дизайнерский отель в центре Петербурга.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Дизайнерские номера'
      },
      {
        name: 'Rixos Krasnaya Polyana Sochi',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Сочи',
        address: 'Красная Поляна, ул. Ачишховская, 12',
        price_per_night: 23000,
        rating: 4.7,
        image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
        description: 'Премиальный горный курорт с видом на Кавказские горы.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Лыжная школа,Бассейн,Консьерж'
      },
      {
        name: 'Fairmont Grand Hotel Kyiv',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Казань',
        address: 'ул. Баумана, 58/25',
        price_per_night: 19000,
        rating: 4.6,
        image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
        description: 'Роскошный отель в историческом центре Казани.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Культурные программы'
      },
      {
        name: 'InterContinental Moscow',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Москва',
        address: 'Тверская ул., 22',
        price_per_night: 21000,
        rating: 4.7,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
        description: 'Элегантный отель на главной улице Москвы.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Конференц-залы'
      },
      {
        name: 'Grand Hotel Emerald',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Санкт-Петербург',
        address: 'Суворовский пр., 18',
        price_per_night: 17000,
        rating: 4.6,
        image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
        description: 'Изысканный отель в тихом районе Петербурга.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Сад'
      },
      {
        name: 'Luxury Mountain Resort',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Сочи',
        address: 'Красная Поляна, ул. Олимпийская, 35',
        price_per_night: 25000,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
        description: 'Эксклюзивный горный курорт с панорамными видами.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Лыжная школа,Хели-ски,Консьерж'
      },
      {
        name: 'Palace Hotel Luxury',
        category: HOTEL_CATEGORIES.LUXURY,
        city: 'Екатеринбург',
        address: 'пр. Ленина, 40',
        price_per_night: 16000,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
        description: 'Роскошный отель в деловом центре Екатеринбурга.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Консьерж,Вертолетная площадка'
      },

      // БИЗНЕС ОТЕЛИ (16 отелей)
      {
        name: 'Marriott Moscow Royal Aurora',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Москва',
        address: 'ул. Петровка, 11/20',
        price_per_night: 12000,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=400&fit=crop&auto=format',
        description: 'Элегантный бизнес-отель рядом с Большим театром.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка,Конференц-залы'
      },
      {
        name: 'Courtyard by Marriott St. Petersburg',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Санкт-Петербург',
        address: 'ул. Большая Морская, 4',
        price_per_night: 9500,
        rating: 4.4,
        image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop&auto=format',
        description: 'Современный бизнес-отель в историческом центре города.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },
      {
        name: 'Radisson Collection Hotel Moscow',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Москва',
        address: 'Кутузовский пр-т, 2/1с1',
        price_per_night: 11000,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
        description: 'Отель для деловых путешественников с отличным расположением.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Парковка'
      },
      {
        name: 'Hilton Moscow Leningradskaya',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Москва',
        address: 'Каланчевская ул., 21/40',
        price_per_night: 13500,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
        description: 'Бизнес-отель в историческом здании сталинской высотки.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Конференц-залы'
      },
      {
        name: 'DoubleTree by Hilton Kazan City Center',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Казань',
        address: 'ул. Правобулачная, 43',
        price_per_night: 8500,
        rating: 4.4,
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
        description: 'Современный бизнес-отель в центре Казани.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },
      {
        name: 'Crowne Plaza Nizhny Novgorod',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Нижний Новгород',
        address: 'Верхне-Волжская наб., 9А',
        price_per_night: 7500,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
        description: 'Бизнес-отель на берегу Волги с отличной инфраструктурой.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Парковка'
      },
      {
        name: 'Novotel Ekaterinburg Centre',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Екатеринбург',
        address: 'ул. Энгельса, 7',
        price_per_night: 8000,
        rating: 4.4,
        image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
        description: 'Современный бизнес-отель в деловом центре Екатеринбурга.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка,Конференц-залы'
      },
      {
        name: 'Hampton by Hilton Volgograd Profsoyuznaya',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Волгоград',
        address: 'ул. Профсоюзная, 13Б',
        price_per_night: 6500,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
        description: 'Комфортный бизнес-отель для деловых поездок.',
        amenities: 'Wi-Fi,Бизнес-центр,Завтрак,Фитнес,Парковка'
      },
      {
        name: 'Sheraton Moscow Sheremetyevo Airport Hotel',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Москва',
        address: 'Аэропорт Шереметьево, Терминал F',
        price_per_night: 10000,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
        description: 'Удобный отель в аэропорту для деловых путешественников.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Трансфер'
      },
      {
        name: 'Holiday Inn Express St. Petersburg Centre',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Санкт-Петербург',
        address: 'ул. Садовая, 32',
        price_per_night: 7000,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1464822759844-d150065c142f?w=800&h=400&fit=crop&auto=format',
        description: 'Практичный бизнес-отель в центре города.',
        amenities: 'Wi-Fi,Бизнес-центр,Завтрак,Фитнес,Парковка'
      },
      {
        name: 'Azimut Hotel Siberia',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Новосибирск',
        address: 'ул. Ленина, 21',
        price_per_night: 6000,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=400&fit=crop&auto=format',
        description: 'Современный бизнес-отель в центре Новосибирска.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },
      {
        name: 'Park Inn by Radisson Sochi City Centre',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Сочи',
        address: 'ул. Навагинская, 9',
        price_per_night: 8500,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=400&fit=crop&auto=format',
        description: 'Бизнес-отель в центре курортного города.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },
      {
        name: 'Mercure Rostov-on-Don Center',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Ростов-на-Дону',
        address: 'Буденновский пр., 59',
        price_per_night: 7200,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
        description: 'Элегантный бизнес-отель в центре города.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Бар,Фитнес,Парковка'
      },
      {
        name: 'Best Western Plus Samara Hotel',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Самара',
        address: 'ул. Молодогвардейская, 194',
        price_per_night: 6800,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
        description: 'Комфортный бизнес-отель для деловых поездок.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },
      {
        name: 'Ramada by Wyndham Kazan City Center',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Казань',
        address: 'ул. Николая Ершова, 1А',
        price_per_night: 7800,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
        description: 'Современный отель в деловом районе Казани.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },
      {
        name: 'Four Points by Sheraton Kaluga',
        category: HOTEL_CATEGORIES.BUSINESS,
        city: 'Калуга',
        address: 'ул. Кирова, 1',
        price_per_night: 5500,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
        description: 'Надежный бизнес-отель в центре Калуги.',
        amenities: 'Wi-Fi,Бизнес-центр,Ресторан,Фитнес,Парковка'
      },

      // БЮДЖЕТНЫЕ ОТЕЛИ И ХОСТЕЛЫ (24 заведения)
      {
        name: 'ibis Moscow Paveletskaya',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Москва',
        address: 'ул. Кожевническая, 8',
        price_per_night: 4500,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
        description: 'Удобный бюджетный отель рядом с вокзалом.',
        amenities: 'Wi-Fi,Ресторан,Парковка,24/7 рецепция'
      },
      {
        name: 'Hampton by Hilton St. Petersburg',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Санкт-Петербург',
        address: 'ул. Моисеенко, 23',
        price_per_night: 3800,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
        description: 'Комфортный бюджетный отель с завтраком.',
        amenities: 'Wi-Fi,Завтрак,Фитнес,Парковка,24/7 рецепция'
      },
      {
        name: 'Holiday Inn Express Moscow',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Москва',
        address: 'Рязанский пр-т, 2к2',
        price_per_night: 4200,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
        description: 'Современный бюджетный отель для экономных путешественников.',
        amenities: 'Wi-Fi,Завтрак,Фитнес,Парковка'
      },
      {
        name: 'ibis budget Rostov-on-Don Center',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Ростов-на-Дону',
        address: 'пр. Стачки, 245',
        price_per_night: 3200,
        rating: 3.9,
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
        description: 'Экономичный отель в центре города с базовыми удобствами.',
        amenities: 'Wi-Fi,Парковка,24/7 рецепция,Кондиционер'
      },
      {
        name: 'Smart Hotel KDO Ekaterinburg',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Екатеринбург',
        address: 'ул. Челюскинцев, 106',
        price_per_night: 2800,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
        description: 'Современный смарт-отель с автоматизированным сервисом.',
        amenities: 'Wi-Fi,Автомат регистрации,Парковка,Кондиционер'
      },
      {
        name: 'Hostel Atmosphere Kazan',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Казань',
        address: 'ул. Чистопольская, 34',
        price_per_night: 2500,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
        description: 'Уютный хостел в центре Казани с дружелюбной атмосферой.',
        amenities: 'Wi-Fi,Общая кухня,Парковка,Прачечная'
      },
      {
        name: 'Pod Hotels Krasnoyarsk',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Красноярск',
        address: 'ул. Карла Маркса, 124',
        price_per_night: 2200,
        rating: 3.8,
        image_url: 'https://images.unsplash.com/photo-1464822759844-d150065c142f?w=800&h=400&fit=crop&auto=format',
        description: 'Капсульный отель с современным дизайном.',
        amenities: 'Wi-Fi,Общие зоны,Парковка,24/7 рецепция'
      },
      {
        name: 'Hostel Navigator Vladivostok',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Владивосток',
        address: 'ул. Фокина, 3А',
        price_per_night: 1800,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
        description: 'Хостел с видом на бухту Золотой Рог.',
        amenities: 'Wi-Fi,Общая кухня,Терраса,Прачечная'
      },
      {
        name: 'Capsule Hotel Moscow',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Москва',
        address: 'ул. Арбат, 15',
        price_per_night: 3500,
        rating: 3.9,
        image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
        description: 'Современный капсульный отель в центре Москвы.',
        amenities: 'Wi-Fi,Общие зоны,Автомат регистрации,Кондиционер'
      },
      {
        name: 'Hostel Friends St. Petersburg',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Санкт-Петербург',
        address: 'Банковский пер., 3',
        price_per_night: 2000,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
        description: 'Популярный хостел в историческом центре.',
        amenities: 'Wi-Fi,Общая кухня,Прачечная,Экскурсии'
      },
      {
        name: 'Budget Inn Novosibirsk',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Новосибирск',
        address: 'ул. Советская, 18',
        price_per_night: 2400,
        rating: 3.8,
        image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
        description: 'Простой и чистый отель для экономных путешественников.',
        amenities: 'Wi-Fi,Парковка,24/7 рецепция,Кондиционер'
      },
      {
        name: 'Hostel Central Sochi',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Сочи',
        address: 'ул. Горького, 87',
        price_per_night: 2800,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
        description: 'Хостел в центре курортного города.',
        amenities: 'Wi-Fi,Общая кухня,Терраса,Близко к пляжу'
      },
      {
        name: 'Mini Hotel Comfort Samara',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Самара',
        address: 'ул. Ленинградская, 61',
        price_per_night: 2600,
        rating: 3.9,
        image_url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=400&fit=crop&auto=format',
        description: 'Уютный мини-отель в центре Самары.',
        amenities: 'Wi-Fi,Парковка,Завтрак,Кондиционер'
      },
      {
        name: 'Hostel Like Nizhny Novgorod',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Нижний Новгород',
        address: 'ул. Большая Покровская, 82',
        price_per_night: 2100,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
        description: 'Современный хостел на пешеходной улице.',
        amenities: 'Wi-Fi,Общая кухня,Прачечная,Игровая зона'
      },
      {
        name: 'Sleep Box Hotel Volgograd',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Волгоград',
        address: 'пр. Ленина, 15',
        price_per_night: 1900,
        rating: 3.7,
        image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
        description: 'Капсульный отель для краткосрочного проживания.',
        amenities: 'Wi-Fi,Общие зоны,24/7 рецепция,Кондиционер'
      },
      {
        name: 'Hostel Voyage Irkutsk',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Иркутск',
        address: 'ул. Карла Маркса, 45',
        price_per_night: 2300,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
        description: 'Хостел для путешественников к Байкалу.',
        amenities: 'Wi-Fi,Общая кухня,Экскурсии,Прачечная'
      },
      {
        name: 'Budget Hotel Express Ufa',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Уфа',
        address: 'ул. Ленина, 88',
        price_per_night: 2700,
        rating: 3.8,
        image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
        description: 'Простой отель в центре Уфы.',
        amenities: 'Wi-Fi,Парковка,24/7 рецепция,Завтрак'
      },
      {
        name: 'Hostel Backpackers Perm',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Пермь',
        address: 'ул. Комсомольский пр., 34',
        price_per_night: 2000,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
        description: 'Хостел для молодых путешественников.',
        amenities: 'Wi-Fi,Общая кухня,Игровая зона,Прачечная'
      },
      {
        name: 'Mini Hotel City Chelyabinsk',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Челябинск',
        address: 'ул. Кирова, 123',
        price_per_night: 2500,
        rating: 3.9,
        image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
        description: 'Компактный отель в центре города.',
        amenities: 'Wi-Fi,Парковка,Завтрак,Кондиционер'
      },
      {
        name: 'Hostel Friendly Yaroslavl',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Ярославль',
        address: 'ул. Советская, 10',
        price_per_night: 2200,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
        description: 'Дружелюбный хостел в историческом центре.',
        amenities: 'Wi-Fi,Общая кухня,Экскурсии,Прачечная'
      },
      {
        name: 'Budget Stay Tula',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Тула',
        address: 'пр. Ленина, 67',
        price_per_night: 2400,
        rating: 3.8,
        image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
        description: 'Недорогой отель для краткосрочного проживания.',
        amenities: 'Wi-Fi,Парковка,24/7 рецепция,Завтрак'
      },
      {
        name: 'Hostel Comfort Kaliningrad',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Калининград',
        address: 'ул. Багратиона, 15',
        price_per_night: 2600,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1464822759844-d150065c142f?w=800&h=400&fit=crop&auto=format',
        description: 'Комфортный хостел в европейском городе.',
        amenities: 'Wi-Fi,Общая кухня,Прачечная,Велопрокат'
      },
      {
        name: 'Sleep Inn Astrakhan',
        category: HOTEL_CATEGORIES.BUDGET,
        city: 'Астрахань',
        address: 'ул. Татищева, 56',
        price_per_night: 2100,
        rating: 3.7,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
        description: 'Простой отель в центре Астрахани.',
        amenities: 'Wi-Fi,Парковка,24/7 рецепция,Кондиционер'
      },

      // КУРОРТНЫЕ ОТЕЛИ (12 отелей)
      {
        name: 'Sochi Marriott Krasnaya Polyana',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Сочи',
        address: 'Эсто-Садок, ул. Медовая, 5',
        price_per_night: 15000,
        rating: 4.6,
        image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=400&fit=crop&auto=format',
        description: 'Горнолыжный курорт с великолепными видами на горы.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Фитнес,Бассейн,Лыжная школа'
      },
      {
        name: 'Rodina Grand Hotel & SPA',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Сочи',
        address: 'Курортный пр-т, 72',
        price_per_night: 12000,
        rating: 4.4,
        image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
        description: 'Исторический курортный отель на берегу Черного моря.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Пляж,Бассейн,Парковка'
      },
      {
        name: 'Hyatt Regency Sochi',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Сочи',
        address: 'Курортный пр-т, 64',
        price_per_night: 13500,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&auto=format',
        description: 'Современный курортный отель с прямым выходом на пляж.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Пляж,Бассейн,Фитнес'
      },
      {
        name: 'Azimut Resort & SPA Yamal',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Анапа',
        address: 'пр. Революции, 3',
        price_per_night: 8500,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop&auto=format',
        description: 'Курортный отель на берегу Азовского моря.',
        amenities: 'Wi-Fi,SPA,Ресторан,Пляж,Бассейн,Анимация,Детский клуб'
      },
      {
        name: 'Baikal View Hotel',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Иркутск',
        address: 'пос. Листвянка, ул. Гудина, 1Б',
        price_per_night: 7000,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format',
        description: 'Отель с потрясающим видом на озеро Байкал.',
        amenities: 'Wi-Fi,Ресторан,Терраса,Экскурсии,Рыбалка,Парковка'
      },
      {
        name: 'Resort Valley Kamchatka',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Петропавловск-Камчатский',
        address: 'ул. Тушканова, 12',
        price_per_night: 9500,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
        description: 'Уникальный курорт среди вулканов Камчатки.',
        amenities: 'Wi-Fi,Ресторан,Термальные источники,Экскурсии,Парковка'
      },
      {
        name: 'Altai Palace Resort',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Горно-Алтайск',
        address: 'с. Майма, ул. Трактовая, 5',
        price_per_night: 6500,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1464822759844-d150065c142f?w=800&h=400&fit=crop&auto=format',
        description: 'Горный курорт в живописных предгорьях Алтая.',
        amenities: 'Wi-Fi,Ресторан,SPA,Верховая езда,Экскурсии,Парковка'
      },
      {
        name: 'Golden Ring Resort Suzdal',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Суздаль',
        address: 'ул. Коровники, 45',
        price_per_night: 5500,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=400&fit=crop&auto=format',
        description: 'Загородный курорт в древнем городе Золотого кольца.',
        amenities: 'Wi-Fi,Ресторан,SPA,Баня,Экскурсии,Парковка'
      },
      {
        name: 'Crimea Palace Resort',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Ялта',
        address: 'Ливадийский дворец, 1',
        price_per_night: 11000,
        rating: 4.4,
        image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=400&fit=crop&auto=format',
        description: 'Роскошный курорт на южном берегу Крыма.',
        amenities: 'Wi-Fi,SPA,Ресторан,Пляж,Бассейн,Винотека,Экскурсии'
      },
      {
        name: 'Caucasus Mountain Resort',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Домбай',
        address: 'пос. Домбай, ул. Аланская, 7',
        price_per_night: 8000,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
        description: 'Горнолыжный курорт в сердце Кавказа.',
        amenities: 'Wi-Fi,Ресторан,Лыжная школа,Подъемники,SPA,Парковка'
      },
      {
        name: 'Black Sea Paradise Resort',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Геленджик',
        address: 'ул. Революционная, 9',
        price_per_night: 9000,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
        description: 'Семейный курорт на берегу Черного моря.',
        amenities: 'Wi-Fi,SPA,Ресторан,Пляж,Бассейн,Детский клуб,Анимация'
      },
      {
        name: 'Karelia Nature Resort',
        category: HOTEL_CATEGORIES.RESORT,
        city: 'Петрозаводск',
        address: 'о. Кижи, причал 1',
        price_per_night: 7500,
        rating: 4.0,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
        description: 'Эко-курорт среди карельских лесов и озер.',
        amenities: 'Wi-Fi,Ресторан,Баня,Рыбалка,Экскурсии,Парковка'
      },

      // БУТИК ОТЕЛИ (12 отелей)
      {
        name: 'Hotel Savoy Moscow',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Москва',
        address: 'ул. Рождественка, 3/6с1',
        price_per_night: 16000,
        rating: 4.7,
        image_url: 'https://images.unsplash.com/photo-1578774282941-a54d9e0e4526?w=800&h=400&fit=crop&auto=format',
        description: 'Изысканный бутик-отель в историческом особняке.',
        amenities: 'Wi-Fi,Ресторан,Бар,SPA,Консьерж,Галерея искусств'
      },
      {
        name: 'Angleterre Hotel St. Petersburg',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Санкт-Петербург',
        address: 'ул. Малая Морская, 24',
        price_per_night: 14000,
        rating: 4.6,
        image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&auto=format',
        description: 'Элегантный бутик-отель с богатой историей.',
        amenities: 'Wi-Fi,Ресторан,Бар,SPA,Консьерж,Библиотека'
      },
      {
        name: 'Rocco Forte Hotel Astoria',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Санкт-Петербург',
        address: 'ул. Большая Морская, 39',
        price_per_night: 20000,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=400&fit=crop&auto=format',
        description: 'Легендарный отель с видом на Исаакиевский собор.',
        amenities: 'Wi-Fi,Ресторан,Бар,SPA,Консьерж,Терраса'
      },
      {
        name: 'Bulgari Hotel Moscow',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Москва',
        address: 'Ленинский пр-т, 32А',
        price_per_night: 35000,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=400&fit=crop&auto=format',
        description: 'Эксклюзивный бутик-отель от итальянского бренда.',
        amenities: 'Wi-Fi,SPA,Ресторан,Бар,Консьерж,Личный стилист'
      },
      {
        name: 'Tsar Palace Hotel Kazan',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Казань',
        address: 'ул. Право-Булачная, 15',
        price_per_night: 12000,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=400&fit=crop&auto=format',
        description: 'Бутик-отель в стиле татарской архитектуры.',
        amenities: 'Wi-Fi,Ресторан,Хаммам,Консьерж,Культурные программы'
      },
      {
        name: 'Art Hotel Nizhny Novgorod',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Нижний Новгород',
        address: 'ул. Большая Покровская, 25',
        price_per_night: 8500,
        rating: 4.4,
        image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=400&fit=crop&auto=format',
        description: 'Арт-отель в пешеходной зоне с галереей современного искусства.',
        amenities: 'Wi-Fi,Ресторан,Арт-галерея,Консьерж,Мастер-классы'
      },
      {
        name: 'Hermitage Boutique Hotel',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Владимир',
        address: 'ул. Большая Московская, 74',
        price_per_night: 7500,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=400&fit=crop&auto=format',
        description: 'Камерный отель в историческом центре древнего Владимира.',
        amenities: 'Wi-Fi,Ресторан,Библиотека,Экскурсии,Антиквариат'
      },
      {
        name: 'Pushkin Hotel Pskov',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Псков',
        address: 'Октябрьский пр-т, 36',
        price_per_night: 6000,
        rating: 4.1,
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&auto=format',
        description: 'Тематический отель, посвященный А.С. Пушкину.',
        amenities: 'Wi-Fi,Ресторан,Библиотека,Литературные вечера,Экскурсии'
      },
      {
        name: 'Design Hotel Loft Moscow',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Москва',
        address: 'ул. Остоженка, 28',
        price_per_night: 18000,
        rating: 4.6,
        image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=400&fit=crop&auto=format',
        description: 'Современный дизайн-отель в стиле лофт.',
        amenities: 'Wi-Fi,Ресторан,Бар,Арт-галерея,Консьерж,Дизайнерские номера'
      },
      {
        name: 'Vintage Hotel St. Petersburg',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Санкт-Петербург',
        address: 'Литейный пр., 61',
        price_per_night: 13000,
        rating: 4.5,
        image_url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800&h=400&fit=crop&auto=format',
        description: 'Винтажный отель в доходном доме XIX века.',
        amenities: 'Wi-Fi,Ресторан,Бар,Антикварная мебель,Консьерж'
      },
      {
        name: 'Merchant House Boutique Hotel',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Ярославль',
        address: 'ул. Революционная, 34',
        price_per_night: 9000,
        rating: 4.2,
        image_url: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=400&fit=crop&auto=format',
        description: 'Бутик-отель в особняке купца XIX века.',
        amenities: 'Wi-Fi,Ресторан,Библиотека,Экскурсии,Антиквариат'
      },
      {
        name: 'Siberian Boutique Hotel',
        category: HOTEL_CATEGORIES.BOUTIQUE,
        city: 'Новосибирск',
        address: 'ул. Каменская, 32',
        price_per_night: 10000,
        rating: 4.3,
        image_url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=400&fit=crop&auto=format',
        description: 'Уникальный отель с сибирским колоритом.',
        amenities: 'Wi-Fi,Ресторан,Баня,Консьерж,Сибирская кухня'
      }
    ];

    const insertStmt = this.db.prepare(`
      INSERT INTO hotels (name, category, city, address, price_per_night, rating, image_url, description, amenities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    sampleHotels.forEach((hotel) => {
      insertStmt.run([
        hotel.name,
        hotel.category,
        hotel.city,
        hotel.address,
        hotel.price_per_night,
        hotel.rating,
        hotel.image_url,
        hotel.description,
        hotel.amenities
      ]);
    });

    insertStmt.finalize((err) => {
      if (err) {
        console.error('Ошибка вставки данных:', err.message);
      } else {
        console.log('🎉 МЕГА база отелей создана! Добавлено 80 заведений:');
        console.log('⭐ Люкс отели: 16');
        console.log('💼 Бизнес отели: 16');
        console.log('💰 Бюджетные/Хостелы: 24');
        console.log('🏖️ Курортные отели: 12');
        console.log('🎨 Бутик отели: 12');
      }
    });
  }

  // Поиск отелей
  async searchHotels(query: string, category?: string, city?: string): Promise<Hotel[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('База данных не инициализирована'));
        return;
      }

      let sql = 'SELECT * FROM hotels WHERE 1=1';
      const params: any[] = [];

      if (query) {
        sql += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${query}%`, `%${query}%`);
      }

      if (category) {
        sql += ' AND category = ?';
        params.push(category);
      }

      if (city) {
        sql += ' AND city LIKE ?';
        params.push(`%${city}%`);
      }

      sql += ' ORDER BY rating DESC';

      this.db.all(sql, params, (err, rows: Hotel[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Получить отель по ID
  async getHotelById(id: number): Promise<Hotel | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('База данных не инициализирована'));
        return;
      }

      this.db.get('SELECT * FROM hotels WHERE id = ?', [id], (err, row: Hotel) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  // Получить отели по категории
  async getHotelsByCategory(category: string): Promise<Hotel[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('База данных не инициализирована'));
        return;
      }

      this.db.all(
        'SELECT * FROM hotels WHERE category = ? ORDER BY rating DESC',
        [category],
        (err, rows: Hotel[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  // Получить все отели
  async getAllHotels(): Promise<Hotel[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('База данных не инициализирована'));
        return;
      }

      this.db.all('SELECT * FROM hotels ORDER BY rating DESC', (err, rows: Hotel[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Закрыть соединение с базой данных
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Ошибка закрытия базы данных:', err.message);
        } else {
          console.log('Соединение с базой данных закрыто.');
        }
      });
    }
  }
}

// Экспортируем единственный экземпляр
export const dbManager = new DatabaseManager();
export default dbManager; 