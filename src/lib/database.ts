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

      // Загружаем российские отели если база пуста
      if (row.count === 0) {
        console.log('Загружаем российские отели в базу данных...');
        this.insertRussianHotelsData();
      } else {
        console.log(`В базе уже есть ${row.count} отелей`);
      }
    });
  }

  private insertRussianHotelsData() {
    if (!this.db) return;

    // Импортируем российские отели
    import('./russianHotels').then(({ allRussianHotelsData }) => {
      const insertStmt = this.db!.prepare(`
        INSERT INTO hotels (name, category, city, address, price_per_night, rating, image_url, description, amenities)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      allRussianHotelsData.forEach((hotel) => {
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
          console.log(`🎉 РОССИЙСКАЯ база отелей создана! Добавлено ${allRussianHotelsData.length} отелей:`);
          console.log('🏙️ По городам:');
          console.log('  🏛️ Москва: отели разных категорий');
          console.log('  🏰 Санкт-Петербург: исторические отели');
          console.log('  🏖️ Сочи: курортные отели');
          console.log('  🕌 Казань: татарские отели');
          console.log('  🏢 Екатеринбург + другие города');
          console.log('⭐ Категории: Люкс, Бизнес, Бюджет, Курорт, Бутик');
          console.log('💰 Цены: от 3,000₽ до 45,000₽ за ночь');
          console.log(`🏨 Всего отелей в базе: ${allRussianHotelsData.length}`);
        }
      });
    }).catch(error => {
      console.error('Ошибка загрузки российских отелей:', error);
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
        sql += ' AND (name LIKE ? OR description LIKE ? OR city LIKE ?)';
        params.push(`%${query}%`, `%${query}%`, `%${query}%`);
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