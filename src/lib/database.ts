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

      // Принудительно обновляем базу для добавления мировых направлений с большим количеством отелей
      if (row.count === 0 || row.count < 300) {
        console.log('Обновляем базу данных с расширенными мировыми направлениями...');
        this.db!.run("DELETE FROM hotels", (err) => {
          if (!err) {
            this.insertExpandedSampleData();
          }
        });
      } else {
        // Проверяем есть ли старые локальные URL изображений
        this.db.get("SELECT COUNT(*) as count FROM hotels WHERE image_url LIKE '/images/%'", (err, row: any) => {
          if (!err && row && row.count > 0) {
            console.log('Найдены устаревшие URL изображений, обновляем базу данных...');
            // Удаляем все данные и создаем заново
            this.db!.run("DELETE FROM hotels", (err) => {
              if (!err) {
                this.insertExpandedSampleData();
              }
            });
          }
        });
      }
    });
  }

  private insertExpandedSampleData() {
    if (!this.db) return;

    // Импортируем расширенную базу отелей
    import('./expandedHotels').then(({ allExpandedHotelsData, generateAdditionalHotels }) => {
      const additionalHotels = generateAdditionalHotels();
      const allHotels = [...allExpandedHotelsData, ...additionalHotels];

      const insertStmt = this.db!.prepare(`
        INSERT INTO hotels (name, category, city, address, price_per_night, rating, image_url, description, amenities)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      allHotels.forEach((hotel) => {
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
          console.log(`🎉 МЕГА база отелей расширена! Добавлено ${allHotels.length} заведений:`);
          console.log('🌍 По городам (включая +6 отелей на каждое направление):');
          console.log('  🇫🇷 Париж: ~31 отелей (+6 новых)');
          console.log('  🇯🇵 Токио: ~31 отелей (+6 новых)');
          console.log('  🇺🇸 Нью-Йорк: ~31 отелей (+6 новых)');
          console.log('  🇬🇧 Лондон: ~26 отелей (+6 новых)');
          console.log('  🇦🇪 Дубай: ~26 отелей (+6 новых)');
          console.log('  🇮🇹 Рим: ~24 отеля (+6 новых)');
          console.log('  🇮🇩 Бали: ~24 отеля (+6 новых)');
          console.log('  🇦🇺 Сидней: ~24 отеля (+6 новых)');
          console.log('  🇪🇸 Барселона: ~24 отеля (+6 новых)');
          console.log('  🇹🇷 Стамбул: ~24 отеля (+6 новых)');
          console.log('  🇸🇬 Сингапур: ~24 отеля (+6 новых)');
          console.log('  🇲🇻 Мальдивы: ~21 отель (+6 новых)');
          console.log('⭐ Категории: Люкс, Бизнес, Бюджет, Курорт, Бутик');
          console.log('💰 Цены: от 3,000₽ до 70,000₽ за ночь');
          console.log('🏨 Всего отелей в базе: ~450+');
        }
      });
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